import { SETTLEMENTS_BY_OBLAST } from './settlements-data.js'

const tariffs = [
  { name: 'Старт', speed: '100', price: '199', unit: 'Мбіт/с', description: 'Для щоденних справ', features: ['Соцмережі та відео', 'Робота й навчання', 'Оптична GPON-мережа'] },
  { name: 'Комфорт', speed: '300', price: '279', unit: 'Мбіт/с', description: 'Баланс на кожен день', features: ['Відео у високій якості', 'Кілька пристроїв онлайн', 'Оптична GPON-мережа'] },
  { name: 'Сімейний', speed: '500', price: '349', unit: 'Мбіт/с', description: 'Більше швидкості для всіх', features: ['Для всієї родини', 'Робота, ігри та стримінг', 'Оптична GPON-мережа'], popular: true },
  { name: 'Максимум', speed: '1', price: '449', unit: 'Гбіт/с', description: 'Максимум можливостей', features: ['Швидкі завантаження', 'Для вимогливих задач', 'Оптична GPON-мережа'] },
]

const towns = [
  { name: 'Ужгород', lat: 48.623, lon: 22.295, dx: 12, dy: -17 },
  { name: 'Великий Березний', lat: 48.894, lon: 22.458, dx: -12, dy: -22 },
  { name: 'Малий Березний', lat: 48.866, lon: 22.444, dx: 12, dy: 22 },
  { name: 'Перечин', lat: 48.734, lon: 22.474, dx: -12, dy: 20 },
  { name: 'Зарічево', lat: 48.770, lon: 22.513, dx: 12, dy: -18 },
  { name: 'Велика Добронь', lat: 48.418, lon: 22.390, dx: -12, dy: -18 },
  { name: 'Мукачево', lat: 48.450, lon: 22.717, dx: -14, dy: -26 },
  { name: 'Чинадійово', lat: 48.485, lon: 22.825, dx: 16, dy: 22 },
  { name: 'Свалява', lat: 48.547, lon: 22.986, dx: 12, dy: -18 },
  { name: 'Воловець', lat: 48.711, lon: 23.188, dx: 12, dy: -18 },
  { name: 'Іршава', lat: 48.316, lon: 23.039, dx: -12, dy: 16 },
  { name: 'Колочава', lat: 48.437, lon: 23.734, dx: -12, dy: -18 },
  { name: 'Тячів', lat: 48.011, lon: 23.572, dx: -12, dy: -19 },
  { name: 'Тарасівка', lat: 48.206, lon: 23.817, dx: -12, dy: 18 },
  { name: 'Великий Бичків', lat: 47.967, lon: 24.015, dx: -12, dy: 19 },
  { name: 'Рахів', lat: 48.050, lon: 24.200, dx: -12, dy: -19 },
]

const mapCities = [
  { name: 'Ужгород', lat: 48.623, lon: 22.295, dx: 12, dy: 16 },
  { name: 'Львів', lat: 49.839, lon: 24.029, dx: 12, dy: -30 },
  { name: 'Київ', lat: 50.450, lon: 30.524, dx: 12, dy: -14 },
  { name: 'Одеса', lat: 46.482, lon: 30.723, dx: -12, dy: -14 },
  { name: 'Харків', lat: 49.993, lon: 36.230, dx: 12, dy: -14 },
  { name: 'Дніпро', lat: 48.464, lon: 35.046, dx: -12, dy: 18 },
  { name: 'Запоріжжя', lat: 47.839, lon: 35.139, dx: 12, dy: 24 },
  { name: 'Донецьк', lat: 48.015, lon: 37.803, dx: 12, dy: -18 },
  { name: 'Сімферополь', lat: 44.952, lon: 34.102, dx: -12, dy: -18 },
]

const mapContour = 'M 45 147 L 64 126 L 77 97 L 77 63 L 96 38 L 122 29 L 160 42 L 198 38 L 237 46 L 269 59 L 314 63 L 339 76 L 371 84 L 365 101 L 346 122 L 326 143 L 301 164 L 275 176 L 250 189 L 230 210 L 243 227 L 282 235 L 320 239 L 358 231 L 390 214 L 422 202 L 461 185 L 486 185 L 512 197 L 531 218 L 518 239 L 538 256 L 563 273 L 589 290 L 614 307 L 608 328 L 589 344 L 557 357 L 525 357 L 493 349 L 467 336 L 442 344 L 410 336 L 384 323 L 352 311 L 320 302 L 294 290 L 262 281 L 237 269 L 205 260 L 173 248 L 147 235 L 122 223 L 102 210 L 83 193 L 70 176 L 58 164 Z'

const tariffGrid = document.querySelector('#tariff-grid')
const dialog = document.querySelector('#lead-dialog')
const dialogTitle = document.querySelector('#dialog-title')
const dialogKicker = document.querySelector('#dialog-kicker')
const dialogIntro = document.querySelector('.dialog__intro')
const dialogForm = dialog.querySelector('.lead-form')
const dialogFormTemplate = dialogForm.innerHTML
const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.nav')
const mapPoints = document.querySelector('.geo-map__points')

function renderTariffs() {
  tariffGrid.innerHTML = tariffs.map((tariff, index) => `
    <article class="tariff-card${tariff.popular ? ' tariff-card--popular' : ''}">
      ${tariff.popular ? '<span class="popular-tag">ЧАСТО ОБИРАЮТЬ</span>' : ''}
      <div class="tariff-card__top"><span class="tariff-card__index">0${index + 1}</span><span class="tariff-card__description">${tariff.description}</span></div>
      <h3>${tariff.name}</h3>
      <div class="tariff-card__speed"><strong>${tariff.speed}</strong><span>${tariff.unit}</span></div>
      <div class="speed-line"><i style="--speed:${(index + 1) * 25}%"></i></div>
      <ul>${tariff.features.map((feature) => `<li><span aria-hidden="true">✓</span>${feature}</li>`).join('')}</ul>
      <div class="tariff-card__price"><strong>${tariff.price}</strong><span>₴ / місяць</span></div>
      <button class="button ${tariff.popular ? 'button--dark' : 'button--outline'}" type="button" data-open-form data-form-type="connection" data-tariff="${tariff.name} — ${tariff.speed} ${tariff.unit}">Обрати тариф <span aria-hidden="true">→</span></button>
    </article>`).join('')
}

function renderMapPoints() {
  const bounds = { minLat: 44, maxLat: 53, minLon: 21.5, maxLon: 40.5 }
  const mapSvg = document.querySelector('.geo-map__art')
  const mapOutline = mapSvg.querySelector('.map-land')
  mapOutline.setAttribute('d', mapContour)
  mapSvg.querySelector('.map-grid-fill').setAttribute('d', mapContour)
  mapOutline.id = 'map-outline'
  mapPoints.innerHTML = mapCities.map((city) => {
    const x = (30 + ((city.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 560) / 640 * 100
    const y = (30 + ((bounds.maxLat - city.lat) / (bounds.maxLat - bounds.minLat)) * 360) / 420 * 100
    const labelClass = city.dx < 0 ? ' map-point--left-label' : ''
    return `<span class="map-point map-point--city${labelClass}" style="--x:${x}%;--y:${y}%;--label-x:${city.dx}px;--label-y:${city.dy}px"><i></i><b>${city.name}</b></span>`
  }).join('')

    const traveler = document.createElementNS(mapSvg.namespaceURI, 'circle')
    traveler.setAttribute('class', 'map-traveler')
    traveler.setAttribute('r', '4.5')
    traveler.setAttribute('aria-hidden', 'true')
    const motion = document.createElementNS(mapSvg.namespaceURI, 'animateMotion')
    motion.setAttribute('dur', '24s')
    motion.setAttribute('repeatCount', 'indefinite')
    motion.setAttribute('rotate', 'auto')
    const path = document.createElementNS(mapSvg.namespaceURI, 'mpath')
    path.setAttribute('href', '#map-outline')
    motion.append(path)
    traveler.append(motion)
    mapSvg.append(traveler)
}

  function renderCoverageTowns() {
    const list = document.querySelector('.town-list')
    list.replaceChildren()
    towns.forEach((town, index) => {
      const row = document.createElement('div')
      const pin = document.createElement('span')
      const name = document.createElement('b')
      const number = document.createElement('small')
      pin.className = 'town-pin'
      name.textContent = town.name
      number.textContent = String(index + 1).padStart(2, '0')
      row.append(pin, name, number)
      list.append(row)
    })

    const askButton = document.createElement('button')
    askButton.type = 'button'
    askButton.dataset.openForm = ''
    askButton.dataset.formType = 'connection'
    askButton.innerHTML = '<span class="town-pin">+</span><b>Ваше місто?</b><small>ЗАПИТАТИ</small>'
    list.append(askButton)
  }

function populateRegionOptions() {
  const regions = SETTLEMENTS_BY_OBLAST

  document.querySelectorAll('form[data-lead-form]').forEach((form) => {
    const regionSelect = form.elements.oblast
    regions.forEach((region) => {
      const option = document.createElement('option')
      option.value = region.name
      option.textContent = region.name
      regionSelect.append(option)
    })
    updateSettlements(form, regions)
  })

  document.addEventListener('change', (event) => {
    if (event.target.matches('select[name="oblast"]')) {
      updateSettlements(event.target.form, regions)
    }
  })

  document.addEventListener('reset', (event) => {
    setTimeout(() => updateSettlements(event.target, regions), 0)
  })
}

function updateSettlements(form, regions) {
  const regionSelect = form.elements.oblast
  const settlementSelect = form.elements.settlement
  const region = regions.find((item) => item.name === regionSelect.value)
  const placeholder = document.createElement('option')
  placeholder.value = ''
  placeholder.disabled = true
  placeholder.selected = true
  placeholder.textContent = region ? 'Оберіть населений пункт' : 'Спершу оберіть область'
  settlementSelect.replaceChildren(placeholder)
  settlementSelect.disabled = !region

  if (!region) return
  region.settlements.forEach((town) => {
    const option = document.createElement('option')
    option.value = town
    option.textContent = town
    settlementSelect.append(option)
  })
  const other = document.createElement('option')
  other.value = 'Інший населений пункт'
  other.textContent = 'Інший населений пункт'
  settlementSelect.append(other)
  }

function setFormType(type, tariff = '') {
  const isConsultation = type === 'consultation'
  dialogTitle.innerHTML = isConsultation ? 'Замовте<br>дзвінок менеджера.' : 'Давайте<br>познайомимось.'
  dialogKicker.textContent = isConsultation ? 'БЕЗКОШТОВНА КОНСУЛЬТАЦІЯ' : 'ЗАЯВКА НА ПІДКЛЮЧЕННЯ'
  dialogIntro.textContent = isConsultation
    ? 'Залиште номер — ми зателефонуємо та відповімо на запитання.'
    : 'Залиште контакти — менеджер перевірить покриття та зателефонує.'
  dialogForm.elements.requestType.value = isConsultation ? 'consultation' : 'connection'
  if (tariff) dialogForm.elements.tariff.value = tariff
}

document.addEventListener('click', (event) => {
  const openButton = event.target.closest('[data-open-form]')
  if (openButton) {
    setFormType(openButton.dataset.formType || 'connection', openButton.dataset.tariff || '')
    dialog.showModal()
    dialog.querySelector('input[name="name"]').focus({ preventScroll: true })
  }

  if (event.target.closest('.dialog__close')) dialog.close()
})

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close()
})

dialog.addEventListener('close', () => {
  if (!dialogForm.querySelector('.form-message')) dialogForm.innerHTML = dialogFormTemplate
  dialogForm.reset()
  const message = dialogForm.querySelector('.form-message')
  message.textContent = ''
  message.className = 'dialog__error form-message'
  dialogForm.querySelector('.button--submit').disabled = false
  dialogForm.querySelector('.button--submit').innerHTML = 'Надіслати заявку <span>→</span>'
})

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!expanded))
  menuToggle.setAttribute('aria-label', expanded ? 'Відкрити меню' : 'Закрити меню')
  navigation.classList.toggle('nav--open', !expanded)
})

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('nav--open')
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'Відкрити меню')
  }
})

function normalizePhone(value) {
  const phone = value.replace(/[\s()-]/g, '')
  return /^(\+?380|0)\d{9}$/.test(phone) ? phone : null
}

function showMessage(form, message, state) {
  const output = form.querySelector('.form-message')
  output.textContent = message
  output.classList.toggle('is-error', state === 'error')
  output.classList.toggle('is-success', state === 'success')
}

async function submitLead(form) {
  const data = Object.fromEntries(new FormData(form).entries())
  data.requestType ||= form.dataset.formType || 'connection'
  const phone = normalizePhone(String(data.phone || ''))
  if (!phone) {
    showMessage(form, 'Вкажіть український номер: +380XXXXXXXXX або 0XXXXXXXXX.', 'error')
    form.elements.phone.focus()
    return
  }
  data.phone = phone
  const button = form.querySelector('[type="submit"]')
  const originalContent = button.innerHTML
  button.disabled = true
  button.textContent = 'Надсилаємо…'
  showMessage(form, '', '')

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Не вдалося надіслати заявку. Спробуйте ще раз.')
    if (form.closest('dialog')) {
      form.innerHTML = '<div class="success-state"><span class="success-check">✓</span><span class="section-kicker">ЗАЯВКУ ОТРИМАНО</span><h3>Дякуємо!</h3><p>Наш менеджер зв’яжеться з вами найближчим часом.</p><button class="button button--dark" type="button" data-success-close>Гаразд</button></div>'
      form.querySelector('[data-success-close]').addEventListener('click', () => dialog.close())
    } else {
      form.reset()
      showMessage(form, 'Дякуємо! Наш менеджер скоро зателефонує вам.', 'success')
      button.innerHTML = originalContent
      button.disabled = false
    }
  } catch (error) {
    showMessage(form, error instanceof Error ? error.message : 'Помилка надсилання. Спробуйте ще раз.', 'error')
    button.innerHTML = originalContent
    button.disabled = false
  }
}

document.querySelectorAll('[data-lead-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    submitLead(form)
  })
})

document.querySelector('#year').textContent = new Date().getFullYear()
renderTariffs()
renderMapPoints()
renderCoverageTowns()
populateRegionOptions()
