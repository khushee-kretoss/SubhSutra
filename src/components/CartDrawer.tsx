import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { config, money } from '../config'
import { products } from '../data/products'

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, subtotal, remove, setQty, clear } = useCart()
  const allPricesConfirmed = items.every(item => products.find(p => p.id === item.productId)?.priceConfirmed)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-[#17231f]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <aside
        aria-label="Shopping bag"
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[430px] bg-[var(--cream)] shadow-2xl flex flex-col transition-transform"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
          <h2 className="font-serif text-2xl font-bold text-forest">Your shopping bag</h2>
          <button onClick={onClose} aria-label="Close bag" className="grid place-items-center w-10 h-10 rounded hover:bg-black/5">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3">
          {count === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">🛍️</div>
              <p className="font-serif italic text-[var(--muted)]">Your bag is waiting for a blessing.</p>
              <Link to="/shop" className="btn mt-4 inline-flex">Explore the kits</Link>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {items.map(item => {
                const p = products.find(x => x.id === item.productId)
                return (
                  <li key={item.productId} className="py-4 flex gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-bold text-forest truncate">{p ? p.name : 'Unknown kit'}</h3>
                      <p className="text-sm text-[var(--muted)]">Each {p?.priceConfirmed ? money(p.price) : 'Price on enquiry'}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => setQty(item.productId, item.qty - 1)} aria-label="Decrease quantity" className="w-8 h-8 grid place-items-center border border-[var(--line)] rounded">−</button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => setQty(item.productId, item.qty + 1)} aria-label="Increase quantity" className="w-8 h-8 grid place-items-center border border-[var(--line)] rounded">+</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => remove(item.productId)} aria-label="Remove item" className="text-xs text-[var(--red)] hover:underline">Remove</button>
                      {p?.priceConfirmed && <span className="font-bold text-forest">{money(p.price * item.qty)}</span>}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {count > 0 && (
          <div className="border-t border-[var(--line)] p-5 bg-white space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-bold text-forest text-lg">{allPricesConfirmed ? money(subtotal) : 'Confirmed with you'}</span>
            </div>
            <p className="text-xs text-[var(--muted)]">Delivery and any fresh-item add-ons are confirmed for your pin code.</p>
            <Link to="/checkout" onClick={onClose} className="btn w-full">Continue to enquiry</Link>
            <button onClick={clear} className="text-xs text-[var(--red)] hover:underline">Empty bag</button>
          </div>
        )}
      </aside>
    </>
  )
}
