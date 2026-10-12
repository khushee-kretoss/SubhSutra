import { Link } from 'react-router-dom'
import { whatsappDisplayNumber, whatsappLink } from '../config'

export default function ContactPage() {
  return <section className="container-site py-16 min-h-[50vh] max-w-3xl">
    <p className="eyebrow">We're happy to help</p>
    <h1 className="font-serif text-4xl md:text-5xl font-semibold text-forest mt-1">Talk to ShubhSutra</h1>
    <p className="text-[var(--muted)] mt-4 max-w-xl">Ask about a kit, a ritual, delivery, or a bulk order. We'll help you find the right place to begin.</p>
    <div className="mt-8 p-6 md:p-8 bg-[var(--paper)] border border-[var(--line)] rounded-lg">
      <p className="eyebrow">WhatsApp support</p>
      <h2 className="font-serif text-3xl text-forest font-semibold mt-2">Let's plan your pooja.</h2>
      <p className="text-[var(--muted)] mt-2">Message us and we'll confirm kit contents, pricing and delivery with you.</p>
      <div className="flex flex-wrap gap-3 items-center mt-6"><a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span aria-hidden="true">&rarr;</span></a><a className="text-sm text-forest underline underline-offset-4" href={`tel:+${whatsappDisplayNumber.replace(/\D/g, '')}`}>{whatsappDisplayNumber}</a></div>
      <Link to="/shop" className="text-sm text-[var(--saffron)] underline underline-offset-4 inline-block mt-6">Browse the collection</Link>
    </div>
  </section>
}
