import { SETTLEMENTS_BY_OBLAST } from '../../settlements-data.js'

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]))

const clean = (value, maxLength = 160) => typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
})

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Метод не підтримується.' })

  const origin = request.headers.get('origin')
  let originHost = ''
  try {
    originHost = origin ? new URL(origin).host : ''
  } catch {
    return json(403, { error: 'Запит відхилено.' })
  }
  if (!originHost || originHost !== new URL(request.url).host) return json(403, { error: 'Запит відхилено.' })
  if (!request.headers.get('content-type')?.includes('application/json')) return json(415, { error: 'Очікується JSON.' })

  let payload
  try {
    const body = await request.text()
    if (body.length > 8192) return json(413, { error: 'Форма завелика.' })
    payload = JSON.parse(body)
  } catch {
    return json(400, { error: 'Не вдалося прочитати заявку.' })
  }

  const name = clean(payload.name, 80)
  const phone = clean(payload.phone, 24).replace(/[\s()-]/g, '')
  const oblast = clean(payload.oblast, 100)
  const settlement = clean(payload.settlement, 100)
  const region = SETTLEMENTS_BY_OBLAST.find((item) => item.name === oblast)
  const settlementIsValid = region?.settlements.includes(settlement) || settlement === 'Інший населений пункт'
  const locationIsValid = (!oblast && !settlement) || (region && settlementIsValid) || (!oblast && settlement === 'Інший населений пункт')
  if (!name || !locationIsValid || !/^(\+?380|0)\d{9}$/.test(phone)) {
    return json(400, { error: 'Перевірте ім’я, український номер телефону та населений пункт.' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return json(503, { error: 'Форма тимчасово недоступна. Зателефонуйте нам.' })

  const requestType = clean(payload.requestType, 50) === 'consultation' ? 'Консультація' : 'Підключення'
  const fields = [
    '<b>Нова заявка · Укртелеком</b>',
    `<b>Тип:</b> ${escapeHtml(requestType)}`,
    `<b>Ім’я:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>`,
    `<b>Область:</b> ${escapeHtml(oblast || '—')}`,
    `<b>Населений пункт:</b> ${escapeHtml(settlement || '—')}`,
    `<b>Вулиця:</b> ${escapeHtml(clean(payload.street, 120) || '—')}`,
    `<b>Будинок:</b> ${escapeHtml(clean(payload.building, 30) || '—')}`,
    `<b>Тариф:</b> ${escapeHtml(clean(payload.tariff, 100) || '—')}`,
    `<b>Коментар:</b> ${escapeHtml(clean(payload.comment, 500) || '—')}`,
  ]

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: fields.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) {
      console.error('Telegram delivery returned HTTP', response.status)
      return json(502, { error: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.' })
    }
    return json(200, { ok: true })
  } catch {
    return json(502, { error: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.' })
  }
}
