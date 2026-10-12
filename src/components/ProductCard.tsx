import { Link } from 'react-router-dom'
import { money } from '../config'
import type { Product } from '../types'

const categoryName: Record<string, string> = { vehicle: 'New vehicle', home: 'New home', festival: 'Festive pooja', everyday: 'Everyday ritual' }

export function ProductCard({ product }: { product: Product }) {
  const primary = product.images[0]
  return <article className="product-card group">
    <Link to={`/product/${product.slug}`} className="block h-full">
      <div className="product-visual">{primary?<img src={`/${primary.src}`} alt={primary.alt} loading="lazy"/>:<span className="emoji" aria-hidden="true">✦</span>}<span className="product-label">{categoryName[product.category] ?? 'Pooja kit'}</span><span className="product-arrow" aria-hidden="true">↗</span></div>
      <div className="p-5"><h3 className="font-serif text-xl font-semibold text-forest leading-snug">{product.name}</h3><p className="text-sm text-[var(--muted)] mt-1 min-h-10">{product.ritualUse ?? `A thoughtful kit for a ${product.category==='vehicle'?'new vehicle':product.category==='home'?'new home':product.category==='festival'?'festive':'daily'} pooja.`}</p><div className="flex items-end justify-between mt-4 pt-4 border-t border-[var(--line)]"><div><span className="block text-[10px] uppercase tracking-wider text-[var(--muted)]">{product.priceConfirmed?'Price':'Availability'}</span><span className="font-semibold text-forest text-lg">{product.priceConfirmed?money(product.price):'On enquiry'}</span></div><span className="card-link">View kit <span aria-hidden="true">→</span></span></div></div>
    </Link>
  </article>
}
