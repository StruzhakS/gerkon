import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, LoaderCircle, X } from 'lucide-react'
import { settlements, tariffs } from '../data/siteData'
import { submitLead } from '../services/LeadService'
import type { LeadFormData } from '../types'
import { normalizeUkrainianPhone } from '../utils/validation'

type LeadModalProps = { open: boolean; onClose: () => void; selectedTariff?: string; initialValues?: Partial<LeadFormData> }
type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const emptyLead: LeadFormData = { name: '', phone: '', settlement: '', street: '', building: '', tariff: '', comment: '' }

export function LeadModal({ open, onClose, selectedTariff = '', initialValues = {} }: LeadModalProps) {
  const [form, setForm] = useState<LeadFormData>({ ...emptyLead, tariff: selectedTariff })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setForm({ ...emptyLead, ...initialValues, tariff: selectedTariff || initialValues.tariff || '' })
    setStatus('idle')
    setError('')
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose, selectedTariff, initialValues])

  const update = (field: keyof LeadFormData, value: string) => setForm((current) => ({ ...current, [field]: value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedPhone = normalizeUkrainianPhone(form.phone)
    if (!form.name.trim()) { setError('Вкажіть, будь ласка, ваше ім’я.'); return }
    if (!normalizedPhone) { setError('Введіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX.'); return }
    if (!form.settlement) { setError('Оберіть населений пункт.'); return }

    setError('')
    setStatus('sending')
    try {
      await submitLead({ ...form, name: form.name.trim(), phone: normalizedPhone })
      setStatus('success')
    } catch (submissionError) {
      setStatus('error')
      setError(submissionError instanceof Error ? submissionError.message : 'Щось пішло не так. Спробуйте ще раз.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
          <motion.section className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.2 }}>
            <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Закрити форму"><X size={20} /></button>
            {status === 'success' ? (
              <div className="success-state"><span className="success-icon"><Check size={28} /></span><span className="eyebrow">Заявку отримано</span><h2 id="lead-title">Дякуємо!</h2><p>Наш менеджер зв’яжеться з вами найближчим часом.</p><button className="button button--primary" type="button" onClick={onClose}>Гаразд</button></div>
            ) : (
              <>
                <span className="eyebrow">Перевірка адреси · без зобов’язань</span>
                <h2 id="lead-title">Інтернет поруч?</h2>
                <p className="modal-intro">Залиште контакти — перевіримо покриття і підкажемо наступний крок.</p>
                <form className="lead-form" onSubmit={handleSubmit}>
                  <label>Ім’я *<input required autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Як до вас звертатися" /></label>
                  <label>Телефон *<input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+380 00 000 00 00" /></label>
                  <label>Населений пункт *<select required value={form.settlement} onChange={(event) => update('settlement', event.target.value)}><option value="">Оберіть населений пункт</option>{settlements.map((settlement) => <option key={settlement} value={settlement}>{settlement}</option>)}<option value="Інший населений пункт">Інший населений пункт</option></select></label>
                  <div className="form-row"><label>Вулиця<input autoComplete="address-line1" value={form.street} onChange={(event) => update('street', event.target.value)} placeholder="Назва вулиці" /></label><label>Будинок<input autoComplete="address-line2" value={form.building} onChange={(event) => update('building', event.target.value)} placeholder="№ будинку" /></label></div>
                  <label>Тариф<select value={form.tariff} onChange={(event) => update('tariff', event.target.value)}><option value="">Поки не обрав / обрала</option>{tariffs.map((tariff) => <option key={tariff.id} value={tariff.name}>{tariff.name} · {tariff.speed} Мбіт/с</option>)}</select></label>
                  <label>Коментар<textarea rows={2} value={form.comment} onChange={(event) => update('comment', event.target.value)} placeholder="Зручний час для дзвінка або деталі" /></label>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <button className="button button--primary button--full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="spin" size={18} /> Надсилаємо…</> : 'Перевірити можливість підключення'}</button>
                  <p className="form-privacy">Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних для відповіді на заявку.</p>
                </form>
              </>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}