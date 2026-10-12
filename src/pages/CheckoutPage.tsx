import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { config, money } from '../config'
import { products } from '../data/products'
import { useCart } from '../store/CartContext'

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [error, setError] = useState('')
  const canEnquire = Boolean(config.whatsappNumber)
  const allPricesConfirmed = items.every(item => products.find(p => p.id === item.productId)?.priceConfirmed)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!config.whatsappNumber) { setError('WhatsApp ordering is not set up yet. Please contact the store owner to enable orders.'); return }
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const phone = String(form.get('phone') ?? '')
    const pin = String(form.get('pin') ?? '')
    const address = String(form.get('address') ?? '')
    const email = String(form.get('email') ?? '')
    const itemLines = items.map(item => { const product = products.find(p => p.id === item.productId); return `${item.qty} x ${product?.name ?? 'Pooja kit'}${product?.priceConfirmed ? ` (${money(product.price)})` : ''}` })
    const message = [`Namaste ShubhSutra, I'd like to enquire about an order.`, `Name: ${name}`, `Phone: ${phone}`, email && `Email: ${email}`, `PIN code: ${pin}`, `Address: ${address}`, `Items: ${itemLines.join('; ')}`, allPricesConfirmed && `Subtotal: ${money(subtotal)}`, `Please confirm final contents, price and delivery before payment.`].filter(Boolean).join('\n')
    window.location.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`
  }
  return <section className="container-site py-12 md:py-16 max-w-4xl"><p className="eyebrow">A thoughtful beginning</p><h1 className="font-serif text-4xl md:text-5xl font-semibold text-forest mt-1">Delivery enquiry</h1><p className="text-[var(--muted)] mt-3 max-w-2xl">Share where you’d like your kits delivered. We’ll confirm the contents, final price and delivery timing with you before payment.</p>{!items.length?<div className="mt-8"><p>Your bag is empty.</p><Link className="btn mt-4" to="/shop">Browse kits</Link></div>:<form className="grid md:grid-cols-2 gap-5 mt-8" onSubmit={submit}><label><span className="field-label">Your name</span><input name="name" required className="field-input" autoComplete="name"/></label><label><span className="field-label">Phone number</span><input name="phone" required type="tel" className="field-input" autoComplete="tel"/></label><label><span className="field-label">Email (optional)</span><input name="email" type="email" className="field-input" autoComplete="email"/></label><label><span className="field-label">PIN code</span><input name="pin" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} className="field-input" autoComplete="postal-code"/></label><label className="md:col-span-2"><span className="field-label">Delivery address</span><textarea name="address" required rows={3} className="field-input" autoComplete="street-address"/></label><div className="md:col-span-2 border border-[var(--line)] bg-[var(--paper)] rounded-lg p-5"><div className="flex justify-between font-semibold text-forest"><span>{allPricesConfirmed?'Subtotal':'Price'}</span><span>{allPricesConfirmed?money(subtotal):'Confirmed with you'}</span></div><p className="text-xs text-[var(--muted)] mt-2">No payment is collected on this page. Delivery cost and final price will be confirmed with you.</p></div>{error&&<p role="alert" className="md:col-span-2 text-sm text-[var(--red)]">{error}</p>}<button disabled={!canEnquire} className="btn md:col-span-2" type="submit">{canEnquire?'Continue to WhatsApp':'WhatsApp ordering not configured'} <span aria-hidden="true">→</span></button>{!canEnquire&&<p className="md:col-span-2 text-xs text-[var(--muted)]">To accept enquiries, set <code>VITE_WHATSAPP_NUMBER</code> to your business number with country code in the app environment.</p>}</form>}</section>
}
