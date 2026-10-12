import productsJson from '../data/products.json'
import type { Product, ProductCategory } from '../types'

export type { Product, ProductCategory }

const DEFAULT_PRODUCT: Omit<Product, 'id' | 'name' | 'slug' | 'category'> = {
  price: 0,
  priceConfirmed: false,
  compareAtPrice: null,
  availability: 'coming_soon',
  stock: null,
  images: [],
  gallery: [],
  includedItems: [],
  contentsConfirmed: false,
  addOns: [],
  ritualUse: null,
  deliveryEstimate: null,
  careNotes: null,
  faqs: [],
  reviews: [],
  notes: '',
}

export const products: Product[] = (productsJson.products as any[]).map(p => ({
  ...DEFAULT_PRODUCT,
  ...p,
  category: (p.category as ProductCategory) ?? 'vehicle',
}))

export function getProduct(slugOrId: string): Product | undefined {
  return products.find(p => p.id === slugOrId || p.slug === slugOrId)
}

export const categories: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All kits' },
  { id: 'vehicle', label: 'Vehicle pooja' },
  { id: 'home', label: 'Home pooja' },
  { id: 'festival', label: 'Festivals' },
  { id: 'everyday', label: 'Everyday' },
]

export const currencySymbol = productsJson.currency ?? 'INR'
export const deliveryFeeDefault = productsJson.deliveryFeeDefault ?? null
