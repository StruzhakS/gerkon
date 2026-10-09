import emailjs from '@emailjs/browser'
import type { LeadFormData } from '../types'
import { sendLeadToTelegram } from './TelegramService'

export async function submitLead(lead: LeadFormData): Promise<void> {
  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (emailServiceId && emailTemplateId && emailPublicKey) {
    await emailjs.send(emailServiceId, emailTemplateId, lead, { publicKey: emailPublicKey })
    return
  }

  await sendLeadToTelegram(lead)
}