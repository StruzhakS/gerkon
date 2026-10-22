import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [placesPath, adminCodesPath, outputPath = 'settlements-data.js'] = process.argv.slice(2)
if (!placesPath || !adminCodesPath) {
  throw new Error('Usage: node scripts/generate-settlements.mjs UA.txt admin1CodesASCII.txt [output.js]')
}

const regionNames = {
  '01': 'Черкаська область',
  '02': 'Чернігівська область',
  '03': 'Чернівецька область',
  '04': 'Дніпропетровська область',
  '06': 'Івано-Франківська область',
  '07': 'Харківська область',
  '09': 'Хмельницька область',
  '10': 'Кіровоградська область',
  '12': 'Київ (місто)',
  '13': 'Київська область',
  '15': 'Львівська область',
  '16': 'Миколаївська область',
  '17': 'Одеська область',
  '18': 'Полтавська область',
  '19': 'Рівненська область',
  '21': 'Сумська область',
  '22': 'Тернопільська область',
  '23': 'Вінницька область',
  '24': 'Волинська область',
  '25': 'Закарпатська область',
  '27': 'Житомирська область',
}

const excludedRegions = new Set(['05', '08', '11', '14', '20', '26'])
const settlementFeatureCodes = new Set(['PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLA4', 'PPLC'])
const excludedPlaces = new Set(['17:Cheremushky', '15:Sykhiv', '02:Masany'])
const nameCorrections = new Map([
  ['27:Khoroshiv', 'Хорошів'],
  ['17:Ovidiopol', 'Овідіополь'],
  ['07:Kupyansk', 'Куп’янськ'],
  ['02:Bobrovytsia', 'Бобровиця'],
  ['02:Sosnytsia', 'Сосниця'],
])
const rows = (text) => text.split(/\r?\n/).filter(Boolean).map((line) => line.split('\t'))

function transliterateLatinName(value) {
  return value.toLowerCase()
    .replace(/tskyi$/, 'цький')
    .replace(/skyi$/, 'ський')
    .replace(/tsk$/, 'цьк')
    .replace(/sk$/, 'ськ')
    .replace(/ets$/, 'ець')
    .replace(/yiv$/, 'їв')
    .replace(/shch/g, 'щ')
    .replace(/zh/g, 'ж')
    .replace(/kh/g, 'х')
    .replace(/ch/g, 'ч')
    .replace(/sh/g, 'ш')
    .replace(/ts/g, 'ц')
    .replace(/yu/g, 'ю')
    .replace(/ya/g, 'я')
    .replace(/ye/g, 'є')
    .replace(/yi/g, 'ї')
    .replace(/ie/g, 'іє')
    .replace(/a/g, 'а').replace(/b/g, 'б').replace(/c/g, 'к').replace(/d/g, 'д')
    .replace(/e/g, 'е').replace(/f/g, 'ф').replace(/g/g, 'ґ').replace(/h/g, 'г')
    .replace(/i/g, 'і').replace(/j/g, 'й').replace(/k/g, 'к').replace(/l/g, 'л')
    .replace(/m/g, 'м').replace(/n/g, 'н').replace(/o/g, 'о').replace(/p/g, 'п')
    .replace(/q/g, 'к').replace(/r/g, 'р').replace(/s/g, 'с').replace(/t/g, 'т')
    .replace(/u/g, 'у').replace(/v/g, 'в').replace(/w/g, 'в').replace(/x/g, 'кс')
    .replace(/y/g, 'и').replace(/z/g, 'з').replace(/'/g, '’')
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let row = 1; row <= left.length; row += 1) {
    let diagonal = previous[0]
    previous[0] = row
    for (let column = 1; column <= right.length; column += 1) {
      const oldValue = previous[column]
      previous[column] = Math.min(
        previous[column] + 1,
        previous[column - 1] + 1,
        diagonal + (left[row - 1] === right[column - 1] ? 0 : 1),
      )
      diagonal = oldValue
    }
  }
  return previous[right.length]
}

function ukrainianName(row) {
  const correction = nameCorrections.get(`${row[10]}:${row[2]}`)
  if (correction) return correction

  const target = transliterateLatinName(row[2])
  const candidates = row[3].split(',')
    .map((name) => name.trim())
    .filter((name) => /^[А-ЯҐЄІЇа-яґєії'’ .-]+$/.test(name))
    .filter((name) => !/(район|массив|масив|столица|перлина|жемчужина|село|місто|область|посёлок|поселок|ош)/i.test(name))

  candidates.sort((left, right) => {
    const score = (name) => {
      const normalized = name.toLowerCase().replace(/['’ .-]/g, '')
      const targetNormalized = target.replace(/['’ .-]/g, '')
      const ukrainianLetters = (name.match(/[ієїґ]/gi) || []).length
      const softSigns = (name.match(/ь/g) || []).length
      const russianLetters = (name.match(/[ыэёъў]/gi) || []).length
      return -editDistance(normalized, targetNormalized) * 6 + ukrainianLetters * 5 + softSigns * 7 - russianLetters * 12
    }
    return score(right) - score(left)
  })

  return candidates[0] || target.charAt(0).toLocaleUpperCase('uk') + target.slice(1)
}

const [adminText, placesText] = await Promise.all([
  readFile(resolve(adminCodesPath), 'utf8'),
  readFile(resolve(placesPath), 'utf8'),
])
const adminCodes = rows(adminText)
const places = rows(placesText)
const regions = []

for (const [adminCode, regionName] of Object.entries(regionNames)) {
  if (excludedRegions.has(adminCode)) continue
  const candidates = places
    .filter((place) => place[8] === 'UA'
      && place[10] === adminCode
      && place[6] === 'P'
      && settlementFeatureCodes.has(place[7])
      && Number(place[14]) > 0
      && !excludedPlaces.has(`${adminCode}:${place[2]}`))
    .filter((place) => adminCode !== '12' || place[2] === 'Kyiv')
    .sort((left, right) => Number(right[14]) - Number(left[14]))

  const settlements = []
  const seen = new Set()
  for (const place of candidates) {
    const name = ukrainianName(place)
    const key = name.toLocaleLowerCase('uk')
    if (seen.has(key)) continue
    seen.add(key)
    settlements.push(name)
    if (settlements.length === 20) break
  }

  if (settlements.length) regions.push({ name: regionName, settlements })
}

const output = `export const SETTLEMENTS_BY_OBLAST = ${JSON.stringify(regions)};\n`
await writeFile(resolve(outputPath), output, 'utf8')
console.log(`Wrote ${regions.length} oblasts and ${regions.reduce((total, region) => total + region.settlements.length, 0)} settlements to ${outputPath}`)
for (const region of regions) console.log(`${region.name}: ${region.settlements.length}`)
