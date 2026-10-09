interface Env {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
  ALLOWED_ORIGIN: string
}

interface Lead {
  name: string
  phone: string
  settlement: string
  street?: string
  building?: string
  tariff?: string
  comment?: string
}

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
  'Vary': 'Origin',
})

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char] ?? char))

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')
    const headers = corsHeaders(env.ALLOWED_ORIGIN)

    if (!origin || origin !== env.ALLOWED_ORIGIN) return new Response('Forbidden', { status: 403 })
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers })
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers })
    if (!request.headers.get('content-type')?.includes('application/json')) return new Response('Expected JSON', { status: 415, headers })

    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > 8_000) return new Response('Payload too large', { status: 413, headers })

    let lead: Lead
    try {
      lead = await request.json() as Lead
    } catch {
      return new Response('Invalid JSON', { status: 400, headers })
    }

    const name = typeof lead.name === 'string' ? lead.name.trim().slice(0, 100) : ''
    const phone = typeof lead.phone === 'string' ? lead.phone.replace(/[\s()-]/g, '') : ''
    const settlement = typeof lead.settlement === 'string' ? lead.settlement.trim().slice(0, 100) : ''
    if (!name || !settlement || !/^(\+?380|0)\d{9}$/.test(phone)) {
      return new Response('Invalid lead details', { status: 400, headers })
    }

    const safe = (value: unknown) => escapeHtml(typeof value === 'string' ? value.trim().slice(0, 500) : '')
    const message = [
      '<b>Нова заявка з gerkon.com</b>',
      `\n<b>Ім’я:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>`,
      `<b>Населений пункт:</b> ${escapeHtml(settlement)}`,
      `<b>Вулиця:</b> ${safe(lead.street) || '—'}`,
      `<b>Будинок:</b> ${safe(lead.building) || '—'}`,
      `<b>Тариф:</b> ${safe(lead.tariff) || '—'}`,
      `<b>Коментар:</b> ${safe(lead.comment) || '—'}`,
    ].join('\n')

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: message, parse_mode: 'HTML', disable_web_page_preview: true }),
      })
      if (!telegramResponse.ok) return new Response('Lead delivery failed', { status: 502, headers })
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } })
    } catch {
      return new Response('Lead delivery failed', { status: 502, headers })
    }
  },
}