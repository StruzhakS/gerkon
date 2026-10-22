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
  { name: 'Ужгород', lat: 48.623, lon: 22.295 },
  { name: 'Львів', lat: 49.839, lon: 24.029 },
  { name: 'Рівне', lat: 50.619, lon: 26.252 },
  { name: 'Луцьк', lat: 50.747, lon: 25.325 },
  { name: 'Ковель', lat: 51.215, lon: 24.711 },
  { name: 'Київ', lat: 50.450, lon: 30.524 },
  { name: 'Житомир', lat: 50.254, lon: 28.658 },
  { name: 'Біла Церква', lat: 49.796, lon: 30.115 },
  { name: 'Чернігів', lat: 51.498, lon: 31.289 },
  { name: 'Суми', lat: 50.907, lon: 34.798 },
  { name: 'Ромни', lat: 50.745, lon: 33.477 },
  { name: 'Прилуки', lat: 50.594, lon: 32.387 },
  { name: 'Хмельницький', lat: 49.422, lon: 26.987 },
  { name: 'Вінниця', lat: 49.233, lon: 28.468 },
  { name: 'Черкаси', lat: 49.444, lon: 32.059 },
  { name: 'Полтава', lat: 49.589, lon: 34.551 },
  { name: 'Кременчук', lat: 49.068, lon: 33.420 },
  { name: 'Кропивницький', lat: 48.507, lon: 32.262 },
  { name: 'Івано-Франківськ', lat: 48.922, lon: 24.711 },
  { name: 'Чернівці', lat: 48.291, lon: 25.940 },
  { name: 'Умань', lat: 48.748, lon: 30.221 },
  { name: 'Одеса', lat: 46.482, lon: 30.723 },
  { name: 'Балта', lat: 47.936, lon: 29.619 },
  { name: 'Первомайськ', lat: 48.044, lon: 30.850 },
  { name: 'Харків', lat: 49.993, lon: 36.230 },
  { name: 'Дніпро', lat: 48.464, lon: 35.046 },
  { name: 'Кривий Ріг', lat: 47.910, lon: 33.392 },
  { name: 'Запоріжжя', lat: 47.839, lon: 35.139 },
  { name: 'Миколаїв', lat: 46.976, lon: 31.994 },
  { name: 'Херсон', lat: 46.635, lon: 32.617 },
  { name: 'Маріуполь', lat: 47.097, lon: 37.543 },
  { name: 'Донецьк', lat: 48.015, lon: 37.803 },
  { name: 'Луганськ', lat: 48.574, lon: 39.307 },
  { name: 'Сімферополь', lat: 44.952, lon: 34.102 },
  { name: 'Тернопіль', lat: 49.553, lon: 25.594 },
]

const mapContour = 'M 342.65 40.59 L 354.69 42.42 L 362.83 32.10 L 372.62 34.38 L 406.04 30.00 L 426.64 55.69 L 418.59 64.87 L 421.26 78.95 L 446.96 81.15 L 458.42 100.82 L 457.72 109.75 L 498.65 125.70 L 523.39 118.51 L 543.28 139.76 L 562.11 139.27 L 609.62 154.03 L 610.00 167.35 L 596.91 191.11 L 604.03 216.12 L 598.96 231.25 L 567.77 234.58 L 551.16 247.24 L 550.14 267.40 L 524.41 271.02 L 502.96 285.70 L 472.79 288.09 L 445.03 305.00 L 467.19 310.59 L 483.31 326.47 L 494.59 336.45 L 499.05 346.83 L 492.57 350.42 L 492.66 359.70 L 473.57 363.11 L 462.56 357.61 L 448.85 372.12 L 437.25 371.34 L 417.32 388.84 L 405.02 390.00 L 393.78 381.98 L 400.20 379.98 L 399.10 357.44 L 365.07 344.21 L 387.23 327.18 L 404.07 323.72 L 406.82 320.59 L 401.76 319.63 L 402.04 311.73 L 341.30 302.28 L 339.08 285.36 L 309.22 290.94 L 297.26 315.93 L 272.30 349.46 L 257.68 341.67 L 242.54 348.97 L 228.15 340.61 L 236.27 335.68 L 241.90 320.12 L 250.72 305.66 L 248.44 297.53 L 255.18 293.91 L 258.36 300.19 L 277.35 301.52 L 285.88 298.17 L 279.87 293.57 L 282.15 286.80 L 270.90 275.27 L 266.24 256.31 L 254.50 248.88 L 256.81 233.51 L 242.25 221.31 L 228.99 219.61 L 205.24 205.47 L 183.81 209.96 L 176.13 216.65 L 162.53 216.65 L 154.42 227.25 L 130.63 231.61 L 119.62 238.57 L 104.66 227.49 L 84.00 227.32 L 64.06 222.30 L 50.14 232.01 L 47.89 219.85 L 30.00 207.51 L 36.29 189.22 L 45.23 177.41 L 52.27 180.06 L 43.95 159.67 L 73.22 121.94 L 89.21 116.66 L 92.67 103.93 L 76.46 64.32 L 91.87 62.56 L 109.53 50.26 L 134.50 49.25 L 167.06 52.81 L 203.03 63.70 L 228.41 64.61 L 240.53 71.16 L 252.63 63.25 L 261.07 73.86 L 290.16 71.69 L 302.98 76.07 L 305.05 53.24 L 314.98 43.28 L 342.65 40.59 Z'

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
            ${tariff.popular ? `<span class="popular-tag">${tariff.priceNote ? 'АКЦІЯ' : 'НАЙПОПУЛЯРНІШЕ'}</span>` : ''}
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

function layoutMapLabels() {
  const mapWidth = mapPoints.clientWidth
  const mapHeight = mapPoints.clientHeight
  const placedLabels = []
  const verticalOffsets = [0, -12, 12, -24, 24, -36, 36, -48, 48, -60, 60, -72, 72]
  const horizontalOffsets = [0, -12, 12, -24, 24, -36, 36]
  const candidates = [
    ...verticalOffsets.flatMap((offset) => [
      { side: 'right', left: 8, top: offset, score: Math.abs(offset) / 100 },
      { side: 'left', left: -8, top: offset, score: 0.1 + Math.abs(offset) / 100 },
    ]),
    ...horizontalOffsets.flatMap((offset) => [
      { side: 'above', left: offset, top: -8, score: 0.2 + Math.abs(offset) / 100 },
      { side: 'below', left: offset, top: 8, score: 0.3 + Math.abs(offset) / 100 },
    ]),
  ]

  const labels = [...mapPoints.querySelectorAll('.map-point--city')]
    .map((point) => ({ point, label: point.querySelector('b') }))
    .sort((first, second) => second.label.textContent.length - first.label.textContent.length)

  labels.forEach(({ point, label }) => {
    const markerX = point.offsetLeft + point.offsetWidth / 2
    const markerY = point.offsetTop + point.offsetHeight / 2
    const width = label.offsetWidth
    const height = label.offsetHeight
    let bestPlacement
    let bestScore = Infinity

    candidates.forEach((candidate) => {
      const left = markerX + candidate.left - (candidate.side === 'left' ? width : candidate.side === 'above' || candidate.side === 'below' ? width / 2 : 0)
      const top = markerY + candidate.top - (candidate.side === 'above' ? height : candidate.side === 'below' ? 0 : height / 2)
      const right = left + width
      const bottom = top + height
      const overflow = Math.max(0, -left) + Math.max(0, -top) + Math.max(0, right - mapWidth) + Math.max(0, bottom - mapHeight)
      const overlap = placedLabels.reduce((total, placed) => {
        const overlapWidth = Math.max(0, Math.min(right + 5, placed.right) - Math.max(left - 5, placed.left))
        const overlapHeight = Math.max(0, Math.min(bottom + 5, placed.bottom) - Math.max(top - 5, placed.top))
        return total + overlapWidth * overlapHeight
      }, 0)
      const score = overflow * 1000 + overlap * 1000 + candidate.score

      if (score < bestScore) {
        bestScore = score
        bestPlacement = { candidate, left, top, right, bottom }
      }
    })

    label.style.left = `${bestPlacement.left - point.offsetLeft}px`
    label.style.top = `${bestPlacement.top - point.offsetTop}px`
    placedLabels.push(bestPlacement)
  })
}

function renderMapPoints() {
  const bounds = { minLat: 44.399644, maxLat: 52.335075, minLon: 22.085608, maxLon: 40.080789 }
  const mapSvg = document.querySelector('.geo-map__art')
  const mapOutline = mapSvg.querySelector('.map-land')
  mapOutline.setAttribute('d', mapContour)
  mapSvg.querySelector('.map-grid-fill').setAttribute('d', mapContour)
  mapOutline.id = 'map-outline'
  mapPoints.innerHTML = mapCities.map((city) => {
    const x = 30 + ((city.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 580
    const y = 30 + ((bounds.maxLat - city.lat) / (bounds.maxLat - bounds.minLat)) * 360
    return `<span class="map-point map-point--city" data-map-x="${x}" data-map-y="${y}" title="${city.name}"><i></i><b>${city.name}</b></span>`
  }).join('')

  const positionMapPoints = () => {
    const matrix = mapSvg.getScreenCTM()
    if (!matrix) return
    const pointsBounds = mapPoints.getBoundingClientRect()
    const svgPoint = mapSvg.createSVGPoint()

    mapPoints.querySelectorAll('.map-point--city').forEach((point) => {
      svgPoint.x = Number(point.dataset.mapX)
      svgPoint.y = Number(point.dataset.mapY)
      const screenPoint = svgPoint.matrixTransform(matrix)
      point.style.left = `${screenPoint.x - pointsBounds.left}px`
      point.style.top = `${screenPoint.y - pointsBounds.top}px`
    })
    layoutMapLabels()
  }

  positionMapPoints()
  new ResizeObserver(positionMapPoints).observe(mapPoints)
  window.addEventListener('resize', positionMapPoints)

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
