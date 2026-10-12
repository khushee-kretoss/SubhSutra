import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'
import type { CartItem, ProductId } from '../types'

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  add: (productId: ProductId, qty?: number) => void
  remove: (productId: ProductId) => void
  setQty: (productId: ProductId, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'shubhsutra-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const add = useCallback((productId: ProductId, qty = 1) => {
    setItems(prev => {
      if (prev.some(it => it.productId === productId)) {
        return prev.map(it => (it.productId === productId ? { ...it, qty: it.qty + qty } : it))
      }
      return [...prev, { productId, qty }]
    })
  }, [])

  const remove = useCallback((productId: ProductId) => {
    setItems(prev => prev.filter(it => it.productId !== productId))
  }, [])

  const setQty = useCallback((productId: ProductId, qty: number) => {
    setItems(prev =>
      prev
        .map(it => (it.productId === productId ? { ...it, qty: Math.max(0, qty) } : it))
        .filter(it => it.qty > 0)
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const count = items.reduce((s, it) => s + it.qty, 0)
    const subtotal = items.reduce((s, it) => {
      const p = products.find(x => x.id === it.productId)
      return s + (p ? p.price * it.qty : 0)
    }, 0)
    return { items, count, subtotal, add, remove, setQty, clear }
  }, [items, add, remove, setQty, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export type { CartItem, ProductId } from '../types'
