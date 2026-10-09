export interface Tariff {
  id: string
  name: string
  speed: string
  price: number
  benefits: string[]
  featured?: boolean
}

export interface LeadFormData {
  name: string
  phone: string
  settlement: string
  street: string
  building: string
  tariff: string
  comment: string
}