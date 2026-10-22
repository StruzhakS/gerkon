import { cp, mkdir, rm } from 'node:fs/promises'

const output = new URL('./dist/', import.meta.url)
const publicFiles = [
  'index.html',
  'app.js',
  'styles.css',
  'forms.css',
  'forms.css',
  'brand.css',
  'map.css',
  'map-labels.css',
  'favicon.svg',
  'ukrtelecom-logo.png',
  'settlements-data.js',
  'settlements-data.js',
  'robots.txt',
]

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
for (const file of publicFiles) {
  await cp(new URL(`./${file}`, import.meta.url), new URL(`./dist/${file}`, import.meta.url))
}
console.log(`Built ${publicFiles.length} public files into dist/`)
