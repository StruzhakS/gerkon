import { Cable } from 'lucide-react'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? ' brand--compact' : ''}`} href="#top" aria-label="Геркон — на головну">
      <span className="brand-mark"><Cable size={22} strokeWidth={2.3} /></span>
      <span className="brand-word">геркон<span>.</span><small>МЕРЕЖА, ЩО ЄДНАЄ</small></span>
    </a>
  )
}