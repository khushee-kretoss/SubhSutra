// Editable configuration. All secrets come from import.meta.env (Vite) or server settings.
// Nothing here is a real credential. Replace placeholders before going live.
const suppliedWhatsApp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '7340450358').replace(/\D/g, '')
const whatsappNumber = suppliedWhatsApp.length === 10 ? `91${suppliedWhatsApp}` : suppliedWhatsApp
export const whatsappDisplayNumber = whatsappNumber.startsWith('91') && whatsappNumber.length === 12
  ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
  : `+${whatsappNumber}`
export const whatsappLink = (message = 'Namaste ShubhSutra, I would like to know more about your pooja kits.') =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

export const config = {
  siteName: 'ShubhSutra',
  siteTagline: 'Pooja kits for every new beginning',
  currency: 'INR' as const,

  // WhatsApp ordering number. A ten-digit Indian mobile is normalized with country code 91.
  whatsappNumber,

  // Online payment provider. Test mode until verified.
  payment: {
    provider: (import.meta.env.VITE_PAYMENT_PROVIDER ?? 'razorpay') as 'razorpay' | 'stripe' | 'none',
    testMode: true,
    // Keys are read from env at runtime; never commit real ones.
    publicKey: import.meta.env.VITE_PAYMENT_PUBLIC_KEY ?? '',
  },

  // Order storage endpoint (Netlify Function or your own API).
  orderApi: import.meta.env.VITE_ORDER_API ?? '/.netlify/functions/create-order',

  // Review moderation endpoint.
  reviewApi: import.meta.env.VITE_REVIEW_API ?? '/.netlify/functions/submit-review',

  // Default delivery fee until the business supplies real zones/charges.
  deliveryFeeDefault: Number(import.meta.env.VITE_DELIVERY_FEE_DEFAULT ?? 0) || 0,
}

export const money = (amount: number | null | undefined): string => {
  if (amount == null || Number.isNaN(Number(amount))) return 'Price on request'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: config.currency, maximumFractionDigits: 0 }).format(Number(amount))
}

export const formatPhone = (v: string): string => v.replace(/\D/g, '').slice(0, 10)
export const formatPin = (v: string): string => v.replace(/\D/g, '').slice(0, 6)
