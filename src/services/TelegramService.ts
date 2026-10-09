import type { LeadFormData } from '../types'

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT

export async function sendLeadToTelegram(lead: LeadFormData): Promise<void> {
  if (!endpoint) {
    throw new Error('Форма ще не підключена. Будь ласка, зателефонуйте нам.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })

  if (!response.ok) {
    throw new Error('Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.')
  }
}