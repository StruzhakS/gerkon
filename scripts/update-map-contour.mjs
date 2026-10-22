import { readFile, writeFile } from 'node:fs/promises'

const appPath = new URL('../app.js', import.meta.url)
const response = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
const obj = await response.json()
const feature = obj.features.find((item) => (item.properties.ADMIN || item.properties.NAME) === 'Ukraine')
if (!feature) throw new Error('Ukraine not found in GeoJSON')

const ukraineRing = feature.geometry.coordinates[0]
const crimeaStart = ukraineRing.findIndex(([lon, lat]) => lon === 34.962342 && lat === 46.273197)
const mainlandStart = ukraineRing.findIndex(([lon, lat]) => lon === 31.74414 && lat === 46.333348)
if (crimeaStart === -1 || mainlandStart === -1) throw new Error('Ukraine contour anchors not found')

const crimeaOutline = [
  [35.65, 46.15],
  [36.15, 45.8],
  [36.5, 45.58],
  [36.638357, 45.351264],
  [36.437266, 45.27204],
  [36.440115, 45.06745],
  [35.847992, 44.992418],
  [35.506196, 45.113511],
  [35.080821, 44.793769],
  [34.720958, 44.810981],
  [34.10255, 44.425116],
  [33.720958, 44.399644],
  [33.372325, 44.576483],
  [33.571544, 44.620551],
  [33.537446, 45.117377],
  [32.481619, 45.408881],
  [33.1692, 45.78441],
  [33.691661, 45.860745],
  [33.777029, 45.929633],
  [33.619884, 45.950751],
  [33.628517, 46.124935],
]
const ring = [
  ...ukraineRing.slice(0, crimeaStart + 1),
  ...crimeaOutline,
  ...ukraineRing.slice(mainlandStart),
]
const xs = ring.map((point) => point[0])
const ys = ring.map((point) => point[1])
const minLon = Math.min(...xs)
const maxLon = Math.max(...xs)
const minLat = Math.min(...ys)
const maxLat = Math.max(...ys)

const points = ring.map(([lon, lat]) => {
  const x = 30 + ((lon - minLon) / (maxLon - minLon)) * 580
  const y = 30 + ((maxLat - lat) / (maxLat - minLat)) * 360
  return `${x.toFixed(2)} ${y.toFixed(2)}`
})

const value = `M ${points.join(' L ')} Z`
let text = await readFile(appPath, 'utf8')
const contourPattern = /const mapContour = '[^']*'/
if (!contourPattern.test(text)) throw new Error('mapContour pattern not found')
const updated = text.replace(contourPattern, `const mapContour = '${value}'`)
if (updated !== text) await writeFile(appPath, updated)
console.log('Updated mapContour from Natural Earth GeoJSON (Ukraine + Crimea included).')
