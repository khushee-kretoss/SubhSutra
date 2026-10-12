import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import type { ProductCategory } from '../types'
import { ProductCard } from '../components/ProductCard'

export function ShopPage() {
  const [params] = useSearchParams()
  const [search, setSearch] = useState('')
  const selectedCategory = params.get('category')
  const validCategory = categories.some(c => c.id === selectedCategory) ? selectedCategory as ProductCategory : 'all'
  const [category, setCategory] = useState<ProductCategory | 'all'>(validCategory)
  useEffect(() => { setSearch(''); setCategory(validCategory) }, [params, validCategory])

  const filtered = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false
    if (search) {
      const q = search.toLowerCase()
      return p.name.toLowerCase().includes(q) || (p.ritualUse ?? '').toLowerCase().includes(q) || p.notes.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="container-site py-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="eyebrow">The ShubhSutra collection</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest mt-1">Choose your pooja kit</h1>
          <p className="text-[var(--muted)] mt-2 max-w-xl">Choose by occasion. We’ll confirm kit contents, final price and delivery with you before you place an order.</p>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} type="search" placeholder="Find your pooja kit" aria-label="Search kits" className="field-input md:w-72" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} aria-pressed={category === c.id} className={category === c.id ? 'chip active' : 'chip'}>{c.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-3" aria-hidden="true">⌕</div>
          <p className="font-serif italic text-[var(--muted)]">No kits match your search.</p>
          <button onClick={() => { setSearch(''); setCategory('all') }} className="btn mt-4">Reset filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default ShopPage
