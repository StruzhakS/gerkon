import { readFile, writeFile } from 'node:fs/promises'

const appPath = new URL('../app.js', import.meta.url)
const response = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
const obj = await response.json()
const feature = obj.features.find((item) => (item.properties.ADMIN || item.properties.NAME) === 'Ukraine')
if (!feature) throw new Error('Ukraine not found in GeoJSON')

const ring = feature.geometry.coordinates[0]
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
const updated = text.replace(/const mapContour = '.*?';/s, `const mapContour = '${value}';`)
if (updated === text) throw new Error('mapContour pattern not found')
await writeFile(appPath, updated)
console.log('Updated mapContour from Natural Earth GeoJSON (Ukraine + Crimea included).')
