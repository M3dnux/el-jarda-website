export interface Product {
  id: string
  name_fr: string
  name_ar: string
  description_fr: string
  description_ar: string
  price: number
  category_id: string
  stock: number
  image_url?: string
  reference: string
  created_at: Date
  updated_at: Date
}

export interface Category {
  id: string
  name_fr: string
  name_ar: string
  description_fr?: string
  description_ar?: string
  created_at: Date
  updated_at: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  type: 'question' | 'appointment'
  status: 'pending' | 'replied' | 'closed'
  created_at: Date
}

export interface User {
  id: string
  email: string
  password: string
  role: 'admin' | 'user'
  created_at: Date
}
