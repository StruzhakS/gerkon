export function normalizeUkrainianPhone(value: string): string | null {
  const normalized = value.replace(/[\s()-]/g, '')
  return /^(\+?380|0)\d{9}$/.test(normalized) ? normalized : null
}