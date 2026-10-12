import { lazy, Suspense, useState } from 'react'
import { createHashRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import { Header, Footer, WhatsAppButton } from './components/Layout'
import { CartDrawer } from './components/CartDrawer'
import { config } from './config'

const Home = lazy(() => import('./HomePage'))
const Shop = lazy(() => import('./pages/ShopPage'))
const Product = lazy(() => import('./pages/ProductPage'))
const Cart = lazy(() => import('./pages/CartPage'))
const Checkout = lazy(() => import('./pages/CheckoutPage'))
const Reviews = lazy(() => import('./pages/ReviewsPage'))
const Faq = lazy(() => import('./pages/FaqPage'))
const Contact = lazy(() => import('./pages/ContactPage'))
const ThankYou = lazy(() => import('./pages/ThankYouPage'))

function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
      <Header onOpenCart={() => setDrawerOpen(true)} />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <WhatsAppButton />
    </>
  )
}

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/product/:slug', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/faq', element: <Faq /> },
      { path: '/contact', element: <Contact /> },
      { path: '/thank-you', element: <ThankYou /> },
    ],
  },
])

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-[var(--muted)]">Loading ShubhSutra…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export { config }
