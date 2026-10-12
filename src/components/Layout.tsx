import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { whatsappLink } from '../config'

const links = [
  { to: '/shop', label: 'Shop all' },
  { to: '/shop?category=vehicle', label: 'Vehicle pooja' },
  { to: '/shop?category=home', label: 'Home pooja' },
  { to: '/shop?category=festival', label: 'Festivals' },
]

export function Header({ onOpenCart }: { onOpenCart?: () => void }) {
  const { count } = useCart()
  return <header className="site-header sticky top-0 z-30">
    <div className="container-site header-main">
      <Link to="/" className="brand" aria-label="ShubhSutra home"><span className="brand-mark">SS</span><span>ShubhSutra<small>RITUALS FOR NEW BEGINNINGS</small></span></Link>
      <nav className="hidden lg:flex items-center gap-7 text-sm">{links.map(link => <Link key={link.to} to={link.to} className="nav-link">{link.label}</Link>)}<Link to="/faq" className="nav-link">Our promise</Link></nav>
      <div className="ml-auto flex items-center gap-3"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="header-contact">WhatsApp</a><button onClick={onOpenCart} aria-label={`Open bag, ${count} items`} className="bag-button"><svg className="bag-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 8.5h14l1 12H4l1-12Z" stroke="currentColor" strokeWidth="1.6"/><path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg><span className="hidden sm:inline">Your bag</span><span className="bag-count">{count}</span></button></div>
    </div>
    <nav className="lg:hidden mobile-nav"><div className="container-site flex gap-2 overflow-x-auto py-2">{links.map(link => <Link key={link.to} to={link.to} className="chip whitespace-nowrap">{link.label}</Link>)}<Link to="/faq" className="chip whitespace-nowrap">FAQs</Link></div></nav>
  </header>
}

export function WhatsAppButton() {
  return <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat with ShubhSutra on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2A12.6 12.6 0 0 0 5.2 22.3L3.5 28.6l6.5-1.7A12.6 12.6 0 1 0 16 3.2Zm0 22.8c-2 0-3.9-.6-5.5-1.7l-.4-.2-3.8 1 1-3.7-.3-.4A10.2 10.2 0 1 1 16 26Zm5.6-7.6c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4Z" fill="currentColor"/></svg><span>WhatsApp us</span></a>
}

export function Footer() {
  return <footer className="site-footer"><div className="container-site"><div className="footer-top"><div><Link to="/" className="brand brand-footer"><span className="brand-mark">SS</span><span>ShubhSutra<small>RITUALS FOR NEW BEGINNINGS</small></span></Link><p className="text-sm text-white/65 mt-4 max-w-xs">Thoughtful pooja kits for life's new rides, new homes and meaningful moments.</p></div><div className="footer-links"><div><strong>Explore</strong><Link to="/shop">All kits</Link><Link to="/shop?category=vehicle">Vehicle pooja</Link><Link to="/shop?category=home">Home pooja</Link></div><div><strong>We're here to help</strong><Link to="/faq">FAQs</Link><Link to="/contact">Contact</Link><Link to="/reviews">Customer stories</Link></div></div></div><div className="footer-bottom"><span>Copyright {new Date().getFullYear()} ShubhSutra</span><span>We confirm contents, price and delivery before you order.</span></div></div></footer>
}
