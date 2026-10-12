export type ProductId = 'bike' | 'car' | 'home' | 'diwali' | 'navratri' | 'nazar'

export type ProductCategory = 'vehicle' | 'home' | 'festival' | 'everyday'

export interface ProductImage {
  src: string
  alt: string
}

export interface IncludedItem {
  name: string
  qty?: string
  note?: string
}

export interface AddOn {
  id: string
  name: string
  price: number
  priceConfirmed: boolean
  note?: string
}

export interface Faq {
  q: string
  a: string
}

export interface Product {
  id: ProductId
  name: string
  slug: string
  category: ProductCategory
  price: number
  priceConfirmed: boolean
  compareAtPrice: number | null
  availability: 'in_stock' | 'out_of_stock' | 'coming_soon'
  stock: number | null
  images: ProductImage[]
  gallery: ProductImage[]
  includedItems: IncludedItem[]
  contentsConfirmed: boolean
  addOns: AddOn[]
  ritualUse: string | null
  deliveryEstimate: string | null
  careNotes: string | null
  faqs: Faq[]
  reviews: VerifiedReview[]
  notes: string
}

export interface VerifiedReview {
  id: string
  author: string
  rating: number
  text: string
  date: string
  verified: true
}

export interface CartItem {
  productId: ProductId
  qty: number
  selectedAddOns?: string[]
}

export interface OrderItem {
  productId: ProductId
  name: string
  qty: number
  price: number
  addOns: { name: string; price: number }[]
}

export interface Order {
  id: string
  createdAt: string
  customer: {
    name: string
    phone: string
    email: string
    pincode: string
    address: string
    destination: 'Home' | 'Dealership'
    needDate: string
    notes: string
  }
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  payment: {
    provider: string
    mode: 'test' | 'live'
    status: 'pending' | 'paid' | 'failed'
    reference: string | null
  }
  channel: 'online' | 'whatsapp'
  status: 'new' | 'confirmed' | 'shipped' | 'delivered'
}

export interface PendingReview {
  id: string
  productId: ProductId | null
  author: string
  email: string
  rating: number
  text: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
}
