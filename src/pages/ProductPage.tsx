import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, products } from '../data/products'
import { money, whatsappLink } from '../config'
import { useCart } from '../store/CartContext'
import { ProductCard } from '../components/ProductCard'

const sampleEssentials: Record<string, { name: string; use: string }[]> = {
  vehicle: [
    { name: 'Kumkum & haldi', use: 'For the auspicious tilak' },
    { name: 'Akshat rice', use: 'A traditional offering' },
    { name: 'Moli thread', use: 'For the pooja ritual' },
    { name: 'Diya & cotton wicks', use: 'To mark the beginning' },
    { name: 'Incense', use: 'A familiar part of worship' },
    { name: 'Flowers', use: 'A finishing touch' },
  ],
  home: [
    { name: 'Kumkum & haldi', use: 'For the auspicious tilak' },
    { name: 'Akshat rice', use: 'A traditional offering' },
    { name: 'Kalash', use: 'A symbol of welcome' },
    { name: 'Diya & cotton wicks', use: 'For the opening ritual' },
    { name: 'Incense', use: 'A familiar part of worship' },
    { name: 'Flowers', use: 'A finishing touch' },
  ],
  festival: [
    { name: 'Kumkum & haldi', use: 'For the auspicious tilak' },
    { name: 'Akshat rice', use: 'A traditional offering' },
    { name: 'Diya & cotton wicks', use: 'For the festive aarti' },
    { name: 'Incense', use: 'A familiar part of worship' },
    { name: 'Moli thread', use: 'For the pooja ritual' },
    { name: 'Flowers', use: 'A finishing touch' },
  ],
  everyday: [
    { name: 'Kumkum & haldi', use: 'For the auspicious tilak' },
    { name: 'Akshat rice', use: 'A traditional offering' },
    { name: 'Diya & cotton wicks', use: 'For daily worship' },
    { name: 'Incense', use: 'A familiar part of worship' },
    { name: 'Moli thread', use: 'For the pooja ritual' },
    { name: 'Flowers', use: 'A finishing touch' },
  ],
}

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const { add } = useCart()

  if (!product) return <section className="container-site py-24 text-center"><p className="eyebrow">Kit not found</p><h1 className="font-serif text-4xl text-forest mt-2">Let's find the right ritual.</h1><Link className="btn mt-6" to="/shop">Browse all kits</Link></section>

  const images = [...product.images, ...product.gallery]
  const image = images[activeImage] ?? images[0]
  const related = [...products.filter(p => p.id !== product.id && p.category === product.category), ...products.filter(p => p.id !== product.id && p.category !== product.category)].slice(0, 3)
  const contents = product.includedItems.length ? product.includedItems.map(item => ({ name: item.name, use: item.note ?? item.qty ?? 'Included in this kit' })) : sampleEssentials[product.category]
  const contentsAreConfirmed = product.contentsConfirmed

  return <>
    <div className="container-site py-5 text-xs tracking-wide text-[var(--muted)]"><Link to="/">Home</Link><span className="mx-2">/</span><Link to="/shop">Shop</Link><span className="mx-2">/</span><span className="text-forest">{product.name}</span></div>
    <section className="container-site product-overview pb-12 md:pb-16">
      <div className="product-gallery-column">
        <div className="product-detail-photo">
          {image ? <img src={`/${image.src}`} alt={image.alt} fetchPriority="high" /> : <div className="w-full h-full grid place-items-center text-6xl text-[var(--gold)]">*</div>}
          {images.length > 1 && <span className="image-index">{String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>}
        </div>
        {images.length > 1 && <div className="grid grid-cols-4 gap-3 mt-3">{images.map((im, i) => <button key={im.src} onClick={() => setActiveImage(i)} aria-label={`View image ${i + 1}`} className={`gallery-thumb ${activeImage === i ? 'active' : ''}`}><img src={`/${im.src}`} alt={im.alt} className="w-full h-full object-cover" /></button>)}</div>}
        <div className="detail-trust-strip"><span>Occasion-led</span><span>Thoughtfully gathered</span><span>Details confirmed before order</span></div>
      </div>
      <div className="product-summary">
        <p className="eyebrow">{product.category} collection</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-forest mt-2 leading-[1.06]">{product.name}</h1>
        <p className="text-[var(--muted)] mt-5 leading-relaxed">{product.ritualUse ?? `A considered starting point for your ${product.category === 'vehicle' ? 'new vehicle' : product.category === 'home' ? 'new home' : product.category === 'festival' ? 'festive celebration' : 'daily'} pooja. Explore the ritual essentials below, then contact us to confirm the final kit.`}</p>
        <div className="price-panel mt-6"><span className="font-serif text-3xl font-semibold text-forest">{product.priceConfirmed ? money(product.price) : 'Price on enquiry'}</span><span className={product.priceConfirmed ? 'badge stock' : 'badge unconfirmed'}>{product.priceConfirmed ? 'Confirmed price' : 'Price being confirmed'}</span><p className="w-full text-xs text-[var(--muted)] mt-1">We'll confirm the final price and availability before ordering.</p></div>
        <div className="flex items-start gap-3 mt-5 p-4 rounded-lg bg-[var(--paper)] border border-[var(--line)]"><span className="text-[var(--saffron)] text-xl" aria-hidden="true">*</span><p className="text-sm text-[var(--muted)]"><strong className="text-forest block">Made for this moment</strong>We're confirming the final contents and delivery details. Ask us about this kit and we'll help you plan.</p></div>
        {product.availability === 'in_stock' ? <button onClick={() => { add(product.id); setAdded(true) }} className="btn w-full mt-5">{added ? 'Added to your bag' : 'Add to bag'}</button> : <a href={whatsappLink(`Namaste ShubhSutra, I am interested in the ${product.name}. Please confirm its pooja contents, price and delivery.`)} target="_blank" rel="noopener noreferrer" className="btn w-full mt-5">Enquire about this kit on WhatsApp <span aria-hidden="true">&rarr;</span></a>}
        <Link to="/contact" className="text-center block text-sm text-[var(--saffron)] underline underline-offset-4 mt-4">Need a different quantity or a bulk order?</Link>
        <div className="delivery-panel mt-7"><h2 className="font-serif text-xl font-semibold text-forest">Delivery, made clear</h2><p className="text-sm text-[var(--muted)] mt-2">{product.deliveryEstimate ?? 'Delivery coverage and timing are being confirmed. Share your pin code when you enquire.'}</p></div>
      </div>
    </section>

    <section className="contents-section py-12 md:py-16">
      <div className="container-site">
        <div className="contents-heading"><div><p className="eyebrow">A closer look</p><h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest mt-1">What's in the kit?</h2><p className="text-sm text-[var(--muted)] mt-2">{contentsAreConfirmed ? 'The contents listed for this kit:' : 'Common pooja essentials to help you picture the ritual:'}</p></div><span className="contents-count">{String(contents.length).padStart(2, '0')} <small>essentials</small></span></div>
        <div className="contents-grid mt-7">{contents.map((item, i) => <article className="contents-card" key={`${item.name}-${i}`}><span className="contents-number">{String(i + 1).padStart(2, '0')}</span><div><h3 className="font-serif text-xl font-semibold text-forest">{item.name}</h3><p className="text-sm text-[var(--muted)] mt-1">{item.use}</p></div><span className="contents-spark" aria-hidden="true">*</span></article>)}</div>
        {!contentsAreConfirmed && <p className="contents-disclaimer">Illustrative guide, not a confirmed packing list. Exact items and quantities vary by kit; we'll confirm everything with you before the order.</p>}
      </div>
    </section>

    {related.length > 0 && <section className="bg-white border-y border-[var(--line)] py-12 md:py-16"><div className="container-site"><p className="eyebrow">Keep exploring</p><h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest mt-1 mb-7">For other meaningful moments</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{related.map(p => <ProductCard key={p.id} product={p} />)}</div></div></section>}
  </>
}
