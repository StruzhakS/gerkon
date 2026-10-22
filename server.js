import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SETTLEMENTS_BY_OBLAST } from './settlements-data.js'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)))
const envPath = resolve(root, '.env')

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const entry = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (!entry || process.env[entry[1]] !== undefined) continue
    const value = entry[2].replace(/^(['"])(.*)\1$/, '$2')
    process.env[entry[1]] = value
  }
}

const port = Number(process.env.PORT || 3000)
const botToken = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
}
const requestsByIp = new Map()
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]))

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(JSON.stringify(payload))
}

async function readJson(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > 8_192) throw new Error('PAYLOAD_TOO_LARGE')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function allowRequest(ip) {
  const now = Date.now()
  const previous = requestsByIp.get(ip) || []
  const recent = previous.filter((timestamp) => now - timestamp < 60_000)
  if (recent.length >= 6) return false
  recent.push(now)
  requestsByIp.set(ip, recent)
  return true
}

async function handleLead(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'Метод не підтримується.' })
  const origin = request.headers.origin
  const host = request.headers.host
  let originHost = ''
  try {
    originHost = origin ? new URL(origin).host : ''
  } catch {
    return sendJson(response, 403, { error: 'Запит відхилено.' })
  }
  if (!originHost || originHost !== host) return sendJson(response, 403, { error: 'Запит відхилено.' })
  if (!request.headers['content-type']?.includes('application/json')) return sendJson(response, 415, { error: 'Очікується JSON.' })
  if (!allowRequest(request.socket.remoteAddress || 'unknown')) return sendJson(response, 429, { error: 'Забагато запитів. Спробуйте трохи пізніше.' })
  if (!botToken || !chatId) return sendJson(response, 503, { error: 'Форма тимчасово недоступна. Зателефонуйте нам.' })

  let payload
  try {
    payload = await readJson(request)
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === 'PAYLOAD_TOO_LARGE'
    return sendJson(response, tooLarge ? 413 : 400, { error: tooLarge ? 'Форма завелика.' : 'Не вдалося прочитати заявку.' })
  }

  const clean = (value, maxLength = 160) => typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
  const name = clean(payload.name, 80)
  const phone = clean(payload.phone, 24).replace(/[\s()-]/g, '')
  const oblast = clean(payload.oblast, 100)
  const settlement = clean(payload.settlement, 100)
  const phoneIsValid = /^(\+?380|0)\d{9}$/.test(phone)
  const region = SETTLEMENTS_BY_OBLAST.find((item) => item.name === oblast)
  const settlementIsValid = region?.settlements.includes(settlement) || settlement === 'Інший населений пункт'
  if (!name || !region || !settlementIsValid || !phoneIsValid) return sendJson(response, 400, { error: 'Перевірте ім’я, український номер телефону, область і населений пункт.' })

  const requestType = clean(payload.requestType, 50) === 'consultation' ? 'Консультація' : 'Підключення'
  const fields = [
    '<b>Нова заявка · Укртелеком</b>',
    `<b>Тип:</b> ${escapeHtml(requestType)}`,
    `<b>Ім’я:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>`,
    `<b>Область:</b> ${escapeHtml(oblast)}`,
    `<b>Населений пункт:</b> ${escapeHtml(settlement)}`,
    `<b>Вулиця:</b> ${escapeHtml(clean(payload.street, 120) || '—')}`,
    `<b>Будинок:</b> ${escapeHtml(clean(payload.building, 30) || '—')}`,
    `<b>Тариф:</b> ${escapeHtml(clean(payload.tariff, 100) || '—')}`,
    `<b>Коментар:</b> ${escapeHtml(clean(payload.comment, 500) || '—')}`,
  ]

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: fields.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8_000),
    })
    if (!telegramResponse.ok) {
      console.error('Telegram delivery failed with status', telegramResponse.status)
      return sendJson(response, 502, { error: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.' })
    }
    return sendJson(response, 200, { ok: true })
  } catch {
    return sendJson(response, 502, { error: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.' })
  }
}

createServer(async (request, response) => {
  let url
  try {
    url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }

  if (url.pathname === '/api/lead') {
    await handleLead(request, response)
    return
  }
  if (!['GET', 'HEAD'].includes(request.method || '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed')
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(url.pathname)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
  if (relativePath.split(/[\\/]/).some((part) => part.startsWith('.'))) {
    response.writeHead(404).end('Not found')
    return
  }
  const filePath = resolve(root, relativePath)
  if (filePath !== root && !filePath.startsWith(root + sep)) {
    response.writeHead(403).end('Forbidden')
    return
  }
  try {
    if (!statSync(filePath).isFile()) throw new Error('Not a file')
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': ['.html', '.css', '.js'].includes(extname(filePath).toLowerCase()) ? 'no-cache' : 'public, max-age=3600',
    })
    if (request.method === 'HEAD') response.end()
    else createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
  }
}).listen(port, () => console.log(`Сайт Укртелекому доступний: http://localhost:${port}`))
