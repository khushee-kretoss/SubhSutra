import { Link } from 'react-router-dom'
import { products } from './data/products'
import { ProductCard } from './components/ProductCard'
import { OccasionCarousel } from './components/OccasionCarousel'

const ritualEssentials = [
  { symbol: '◉', name: 'Kumkum & haldi', detail: 'For the auspicious tilak' },
  { symbol: '✳', name: 'Akshat rice', detail: 'A traditional offering' },
  { symbol: '♨', name: 'Diya & cotton wicks', detail: 'A little light for the moment' },
  { symbol: '❋', name: 'Flowers & sacred thread', detail: 'Finishing touches for the ritual' },
]

export default function HomePage() {
  const featured = products.slice(0, 3)
  return <div>
    <div className="bg-[var(--forest)] text-white text-center text-xs tracking-wide py-2 px-4">Thoughtful pooja kits for life's new beginnings <span className="text-[var(--gold)] mx-2">✦</span> Contents and delivery confirmed before you order</div>
    <section className="hero-home overflow-hidden">
      <div className="container-site grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-center py-12 md:py-16 lg:py-20">
        <div className="relative z-10">
          <p className="eyebrow">A little more meaning, from the very first moment</p>
          <h1 className="font-serif text-[2.9rem] md:text-6xl xl:text-7xl font-semibold text-forest leading-[1.02] mt-4">Begin well.<br/><em className="font-normal text-[var(--saffron)]">Begin blessed.</em></h1>
          <p className="text-[var(--muted)] mt-6 max-w-lg leading-relaxed">A new ride, a new home, a festival with everyone around the table. Find a pooja kit made for the moment you want to remember.</p>
          <div className="flex flex-wrap gap-3 mt-7"><Link to="/shop" className="btn">Explore the collection <span aria-hidden="true">&rarr;</span></Link><Link to="/shop?category=vehicle" className="btn ghost">Shop vehicle kits</Link></div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[var(--muted)]"><span><i className="home-check">&#10003;</i> Choose by occasion</span><span><i className="home-check">&#10003;</i> Clear kit details</span><span><i className="home-check">&#10003;</i> Personal support</span></div>
        </div>
        <div className="hero-photo relative"><img src="/assets/pooja-box-hero.png" alt="A carefully arranged pooja kit with ritual essentials" fetchPriority="high"/><div className="hero-note"><span className="text-[var(--saffron)] text-xl">&#10022;</span><span><strong className="block text-forest font-serif text-lg">For your new beginning</strong><small className="text-[var(--muted)]">Gathered with care, ready when you are</small></span></div></div>
      </div>
    </section>

    <OccasionCarousel />

    <section className="border-y border-[var(--line)] bg-white"><div className="container-site grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--line)] py-2">
      {[['01','Choose your moment','New vehicle, new home or festive pooja'],['02','See what is included','Kit details are shown up front'],['03','Confirm before dispatch','We’ll verify price and delivery with you']].map(([n,t,d])=><div key={n} className="flex gap-4 items-center px-4 py-5 md:px-7"><span className="font-serif text-2xl text-[var(--gold)]">{n}</span><div><strong className="block text-forest">{t}</strong><span className="text-sm text-[var(--muted)]">{d}</span></div></div>)}
    </div></section>

    <section className="container-site py-16 md:py-20"><div className="section-heading"><div><p className="eyebrow">A good place to begin</p><h2 className="font-serif text-3xl md:text-5xl font-semibold text-forest mt-2">Find the kit for your moment.</h2><p className="text-[var(--muted)] mt-3 max-w-xl">Thoughtful starting points for the milestones worth celebrating.</p></div><Link to="/shop" className="text-sm font-bold text-[var(--saffron)] hover:underline">View all kits →</Link></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-8">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>

    <section className="bg-white border-y border-[var(--line)] py-14 md:py-20"><div className="container-site grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"><div className="contents-photo"><img src="/assets/occasion-triptych.png" alt="A triptych showing a home welcome ritual, Lakshmi-Ganesh pooja, and kalash worship" loading="lazy"/><span className="photo-caption">Three moments, each with its own ritual</span></div><div><p className="eyebrow">A closer look</p><h2 className="font-serif text-3xl md:text-5xl font-semibold text-forest mt-2">What’s in the kit?</h2><p className="text-[var(--muted)] mt-4 leading-relaxed">Each occasion calls for its own essentials. Explore the traditional items commonly used in a pooja, then check the product page for the confirmed contents of your chosen kit.</p><div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 mt-7">{ritualEssentials.map(item=><div key={item.name} className="flex gap-3"><span className="ritual-symbol">{item.symbol}</span><span><strong className="block text-forest">{item.name}</strong><small className="text-[var(--muted)]">{item.detail}</small></span></div>)}</div><p className="text-xs text-[var(--muted)] border-l-2 border-[var(--gold)] pl-3 mt-7">Illustrative guide only. Exact kit contents vary by occasion and will be confirmed before an order is placed.</p><Link to="/shop" className="btn mt-6">Choose your occasion</Link></div></div></section>

    <section className="story-band py-14 md:py-20"><div className="container-site grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><p className="eyebrow text-[#e9bd65]">For dealerships, communities & thoughtful hosts</p><h2 className="font-serif text-3xl md:text-5xl font-semibold text-white mt-2">Make someone’s first day feel special.</h2><p className="text-white/75 mt-3 max-w-xl">Ask us about welcome kits for new vehicle owners, housewarmings and community celebrations.</p></div><Link to="/contact" className="btn btn-light">Enquire about a bulk order <span aria-hidden="true">→</span></Link></div></section>
  </div>
}
