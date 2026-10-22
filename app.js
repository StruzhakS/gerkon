import { SETTLEMENTS_BY_OBLAST } from './settlements-data.js'

const tariffGroups = [
  {
    title: 'Укртелеком Інтернет',
    subtitle: 'Стабільна швидкість для дому та роботи',
    plans: [
      {
        name: 'Акція для нових абонентів',
        price: '99',
        unit: 'грн/міс',
        description: 'Легке підключення від 1 грн',
        features: ['Швидкість до 1 Гбіт/с', 'Легке підключення від 1 грн', 'Працює без світла', 'Технологія GPON', 'Ціна може відрізнятися для різних адрес', 'Діє в певних акційних населених пунктах'],
        priceNote: true,
        popular: true,
      },
      {
        name: 'Регулярний тариф',
        price: '300',
        unit: 'грн/міс',
        description: 'Тариф залежить від населеного пункту',
        features: ['Швидкість до 1 Гбіт/с', 'Легке підключення від 1 грн', 'Працює без світла', 'Технологія GPON', 'Тариф залежить від населеного пункту'],
      },
    ],
  },
  {
    title: 'Інтернет + Телебачення',
    subtitle: 'Комфортний пакет для розваг і щоденного використання',
    plans: [
      {
        name: 'Оптимальний Дует',
        price: '400',
        unit: 'грн/міс',
        description: 'Інтернет до 1 Гбіт/с + понад 440 каналів',
        features: ['Інтернет до 1 Гбіт/с', 'Телебачення: понад 440 каналів', 'Понад 14 500 фільмів', 'Спортивні та преміальні канали'],
        popular: true,
      },
      {
        name: 'Максимальний Дует',
        price: '550',
        unit: 'грн/міс',
        description: 'Інтернет до 1 Гбіт/с + понад 480 каналів',
        features: ['Інтернет до 1 Гбіт/с', 'Телебачення: понад 480 каналів', 'Понад 16 000 фільмів', 'Спортивні та преміальні канали', 'Топові спортивні трансляції'],
      },
    ],
  },
  {
    title: 'Тарифи Телебачення',
    subtitle: 'Вибір для фільмів, спорту та живих трансляцій',
    plans: [
      {
        name: 'Легкий',
        price: '129',
        unit: 'грн/міс',
        description: 'Понад 370 каналів',
        features: ['Понад 370 каналів', 'Понад 12 500 фільмів', 'Спортивні канали'],
      },
      {
        name: 'Оптимальний',
        price: '249',
        unit: 'грн/міс',
        description: 'Понад 440 каналів',
        features: ['Понад 440 каналів', 'Понад 14 500 фільмів', 'Спортивні та преміальні канали'],
        popular: true,
      },
      {
        name: 'Максимальний',
        price: '449',
        unit: 'грн/міс',
        description: 'Понад 480 каналів',
        features: ['Понад 480 каналів', 'Понад 16 000 фільмів', 'Спортивні та преміальні канали', 'Топові спортивні трансляції'],
      },
    ],
  },
]

const mapCities = [
  { name: 'Ужгород', lat: 48.623, lon: 22.295, dx: 10, dy: 12 },
  { name: 'Львів', lat: 49.839, lon: 24.029, dx: 10, dy: -20 },
  { name: 'Луцьк', lat: 50.747, lon: 25.325, dx: -14, dy: -14 },
  { name: 'Київ', lat: 50.450, lon: 30.524, dx: 10, dy: -12 },
  { name: 'Полтава', lat: 49.589, lon: 34.551, dx: -12, dy: 14 },
  { name: 'Одеса', lat: 46.482, lon: 30.723, dx: -10, dy: -12 },
  { name: 'Харків', lat: 49.993, lon: 36.230, dx: 10, dy: -12 },
  { name: 'Дніпро', lat: 48.464, lon: 35.046, dx: -10, dy: 16 },
  { name: 'Запоріжжя', lat: 47.839, lon: 35.139, dx: 10, dy: 18 },
  { name: 'Миколаїв', lat: 46.976, lon: 31.994, dx: -10, dy: 16 },
  { name: 'Херсон', lat: 46.635, lon: 32.617, dx: 10, dy: 16 },
  { name: 'Донецьк', lat: 48.015, lon: 37.803, dx: 10, dy: -16 },
  { name: 'Сімферополь', lat: 44.952, lon: 34.102, dx: -10, dy: -14 },
  { name: 'Тернопіль', lat: 49.553, lon: 25.594, dx: -12, dy: -18 },
]

const mapContour = 'M 342.65 41.93 L 354.69 44.00 L 362.83 32.37 L 372.62 34.94 L 406.04 30.00 L 426.64 58.95 L 418.59 69.30 L 421.26 85.17 L 446.96 87.64 L 458.42 109.81 L 457.72 119.87 L 498.65 137.84 L 523.39 129.75 L 543.28 153.69 L 562.11 153.14 L 609.62 169.77 L 610.00 184.78 L 596.91 211.55 L 604.03 239.74 L 598.96 256.79 L 567.77 260.54 L 551.16 274.81 L 550.14 297.52 L 524.41 301.61 L 502.96 318.15 L 472.79 320.85 L 445.03 339.90 L 446.65 367.28 L 441.79 365.72 L 437.60 355.63 L 427.24 353.61 L 404.32 342.65 L 395.83 355.31 L 391.40 349.75 L 341.30 336.83 L 339.08 317.77 L 309.22 324.06 L 297.26 352.21 L 272.30 390.00 L 257.68 381.23 L 242.54 389.45 L 228.15 380.03 L 236.27 374.48 L 241.90 356.94 L 250.72 340.64 L 248.44 331.48 L 255.18 327.41 L 258.36 334.48 L 277.35 335.98 L 285.88 332.20 L 279.87 327.01 L 282.15 319.40 L 270.90 306.40 L 266.24 285.03 L 254.50 276.66 L 256.81 259.34 L 242.25 245.58 L 228.99 243.67 L 205.24 227.74 L 183.81 232.80 L 176.13 240.34 L 162.53 240.33 L 154.42 252.28 L 130.63 257.19 L 119.62 265.04 L 104.66 252.55 L 84.00 252.36 L 64.06 246.70 L 50.14 257.65 L 47.89 243.94 L 30.00 230.04 L 36.29 209.43 L 45.23 196.12 L 52.27 199.10 L 43.95 176.13 L 73.22 133.61 L 89.21 127.66 L 92.67 113.31 L 76.46 68.68 L 91.87 66.69 L 109.53 52.83 L 134.50 51.70 L 167.06 55.70 L 203.03 67.97 L 228.41 69.00 L 240.53 76.39 L 252.63 67.48 L 261.07 79.43 L 290.16 76.98 L 302.98 81.92 L 305.05 56.19 L 314.98 44.96 L 342.65 41.93 Z'

const tariffGrid = document.querySelector('#tariff-grid')
const dialog = document.querySelector('#lead-dialog')
const dialogTitle = document.querySelector('#dialog-title')
const dialogKicker = document.querySelector('#dialog-kicker')
const dialogIntro = document.querySelector('.dialog__intro')
const dialogForm = dialog.querySelector('.lead-form')
const consentLabel = document.createElement('label')
consentLabel.className = 'consent-check'
const consentInput = document.createElement('input')
consentInput.type = 'checkbox'
consentInput.name = 'personalDataConsent'
consentInput.value = 'accepted'
consentInput.required = true
consentInput.setAttribute('aria-describedby', 'personal-data-consent-copy')
const consentCopy = document.createElement('span')
consentCopy.id = 'personal-data-consent-copy'
consentCopy.textContent = 'Відправляючи заявку на цьому сайті, Ви даєте згоду на обробку вказаних Вами персональних даних відповідно до умов Закону України «Про захист персональних даних» виключно з метою отримання пропозиції щодо надання послуг АТ «Укртелеком» та підтверджуєте, що не є громадянином (або резидентом) Євросоюзу або Швейцарії.'
consentLabel.append(consentInput, consentCopy)
dialogForm.querySelector('.button--submit').before(consentLabel)
const representativeNote = document.createElement('div')
representativeNote.className = 'dialog-representative'
representativeNote.innerHTML = '<span>©2026, Офіційний представник</span><strong>ПАТ «Укртелеком»</strong>'
dialogForm.append(representativeNote)
const dialogFormTemplate = dialogForm.innerHTML
const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.nav')
const mapPoints = document.querySelector('.geo-map__points')

function renderTariffs() {
  tariffGrid.innerHTML = tariffGroups.map((group) => `
    <div class="tariff-group">
      <div class="tariff-group__header">
        <span class="section-kicker">${group.title}</span>
        <p>${group.subtitle}</p>
      </div>
      <div class="tariff-group__cards">
        ${group.plans.map((tariff, index) => `
          <article class="tariff-card${tariff.popular ? ' tariff-card--popular' : ''}">
            ${tariff.popular ? '<span class="popular-tag">НАЙПОПУЛЯРНІШЕ</span>' : ''}
            <div class="tariff-card__top"><span class="tariff-card__index">0${index + 1}</span><span class="tariff-card__description">${tariff.description}</span></div>
            <h3>${tariff.name}</h3>
            <div class="tariff-card__speed"><strong>${tariff.price}</strong>${tariff.priceNote ? '<sup class="tariff-price-note">*</sup>' : ''}<span>${tariff.unit}</span></div>
            <div class="speed-line"><i style="--speed:${(index + 1) * 28}%"></i></div>
            <ul>${tariff.features.map((feature) => {
              const isFootnote = feature.includes('певних акційних населених пунктах')
              return `<li><span class="tariff-feature__marker${isFootnote ? ' tariff-feature__marker--footnote' : ''}" aria-hidden="true">${isFootnote ? '*' : '✓'}</span>${feature}</li>`
            }).join('')}</ul>
            <button class="button ${tariff.popular ? 'button--dark' : 'button--outline'}" type="button" data-open-form data-form-type="connection" data-tariff="${group.title} — ${tariff.name}">Обрати тариф <span aria-hidden="true">→</span></button>
          </article>`).join('')}
      </div>
    </div>
  `).join('')
  const offerNote = document.createElement('p')
  offerNote.className = 'fine-print fine-print--offer'
  offerNote.textContent = '* Акційна ціна 99 грн/міс діє для нових абонентів у певних населених пунктах. Уточніть доступність для вашої адреси.'
  tariffGrid.after(offerNote)
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
    return `<span class="map-point map-point--city${labelClass}" style="--x:${x}%;--y:${y}%;--label-x:${city.dx}px;--label-y:${city.dy}px" title="${city.name}"><i></i><b>${city.name}</b></span>`
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

  function getRandomItems(items, count) {
    const shuffled = [...items]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      const currentItem = shuffled[index]
      shuffled[index] = shuffled[randomIndex]
      shuffled[randomIndex] = currentItem
    }
    return shuffled.slice(0, count)
  }

  function animateMatrixName(element, target, delay) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      element.textContent = target
      return
    }

    const glyphs = Array.from('АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ0123456789')
    const characters = Array.from(target)
    const frames = 15
    let frame = 0
    element.classList.add('is-scrambling')

    const animate = () => {
      frame += 1
      const lockedCharacters = Math.floor((frame / frames) * characters.length)
      element.textContent = characters.map((character, index) => {
        if (index < lockedCharacters || /[\s’'-]/u.test(character)) return character
        return glyphs[Math.floor(Math.random() * glyphs.length)]
      }).join('')

      if (frame >= frames) {
        element.textContent = target
        element.classList.remove('is-scrambling')
        return
      }
      window.setTimeout(animate, 34)
    }

    window.setTimeout(animate, delay)
  }

  function renderCoverageTowns() {
    const list = document.querySelector('.town-list')
    list.replaceChildren()
    const settlementNames = [...new Set(SETTLEMENTS_BY_OBLAST.flatMap(({ settlements }) => settlements))]
    const status = document.createElement('div')
    status.className = 'town-list__status'
    status.setAttribute('aria-hidden', 'true')
    status.innerHTML = '<i></i><span>ОНОВЛЮЄМО СПИСОК МІСТ</span>'
    list.append(status)

    getRandomItems(settlementNames, 12).forEach((townName, index) => {
      const row = document.createElement('div')
      const pin = document.createElement('span')
      const name = document.createElement('b')
      const number = document.createElement('small')
      row.className = 'town-list__row'
      row.style.setProperty('--town-delay', `${index * 65}ms`)
      pin.className = 'town-pin'
      name.className = 'town-list__name'
      name.textContent = townName
      number.textContent = String(index + 1).padStart(2, '0')
      row.append(pin, name, number)
      list.append(row)
    })

    const coverageRows = [...list.querySelectorAll('.town-list__row')]
    window.setInterval(() => {
      if (document.hidden) return
      const availableNames = settlementNames.filter((name) =>
        !coverageRows.some((row) => row.querySelector('b').textContent === name),
      )
      const nextNames = getRandomItems(availableNames, coverageRows.length)
      status.classList.add('is-visible')
      coverageRows.forEach((row, index) => {
        const name = row.querySelector('b')
        animateMatrixName(name, nextNames[index], index * 55)
      })
      window.setTimeout(() => status.classList.remove('is-visible'), 1450)
    }, 4200)

    const askButton = document.createElement('button')
    askButton.type = 'button'
    askButton.dataset.openForm = ''
    askButton.dataset.formType = 'connection'
    askButton.innerHTML = '<span class="town-pin">+</span><b>Ваше місто?</b><small>ЗАПИТАТИ</small>'
    list.append(askButton)
  }

  function initFaqAccordions() {
    document.querySelectorAll('.faq-list details').forEach((details) => {
      const summary = details.querySelector('summary')
      const answer = details.querySelector('p')
      const answerPanel = document.createElement('div')
      const answerContent = document.createElement('div')
      let closeTimer

      answerPanel.className = 'faq-answer'
      answerContent.className = 'faq-answer__inner'
      answer.replaceWith(answerPanel)
      answerPanel.append(answerContent)
      answerContent.append(answer)
      summary.setAttribute('aria-expanded', String(details.open))

      summary.addEventListener('click', (event) => {
        event.preventDefault()

        if (closeTimer) {
          window.clearTimeout(closeTimer)
          closeTimer = undefined
          details.classList.remove('is-closing')
          summary.setAttribute('aria-expanded', 'true')
          return
        }

        if (!details.open) {
          details.open = true
          summary.setAttribute('aria-expanded', 'true')
          return
        }

        summary.setAttribute('aria-expanded', 'false')
        details.classList.add('is-closing')
        const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420
        closeTimer = window.setTimeout(() => {
          details.open = false
          details.classList.remove('is-closing')
          closeTimer = undefined
        }, closeDelay)
      })
    })
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
    document.documentElement.classList.add('dialog-open')
    document.body.classList.add('dialog-open')
    dialog.querySelector('input[name="name"]').focus({ preventScroll: true })
  }

  if (event.target.closest('.dialog__close')) dialog.close()
})

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close()
})

dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('dialog-open')
  document.body.classList.remove('dialog-open')
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
initFaqAccordions()
populateRegionOptions()
