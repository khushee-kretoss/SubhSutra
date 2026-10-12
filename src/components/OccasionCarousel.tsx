import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  { title: 'A new ride. A beautiful beginning.', detail: 'Make the first journey in your new two-wheeler feel special with a pooja made for the moment.', image: 'assets/new-vehicle-pooja.png', alt: 'A new scooter decorated with a flower garland beside a pooja thali', eyebrow: 'THE FIRST RIDE', action: 'Explore vehicle pooja', to: '/product/two-wheeler-pooja-kit', position: 'center 54%' },
  { title: 'Every journey begins with a blessing.', detail: 'A considered way to welcome your new car and the miles of memories ahead.', image: 'assets/new-car-story.png', alt: 'A new car decorated with marigold flowers outside a home', eyebrow: 'A NEW CAR', action: 'See the car pooja kit', to: '/product/new-car-pooja-kit', position: 'center 53%' },
  { title: 'Let your new home feel like home.', detail: 'Mark the moment you step through your new doorway with a thoughtful Griha Pravesh pooja.', image: 'assets/griha-pravesh-scene.png', alt: 'A welcoming home entrance decorated for a housewarming pooja', eyebrow: 'A NEW HOME', action: 'Explore Griha Pravesh', to: '/product/griha-pravesh-kit', position: 'center 51%' },
  { title: 'Bring a little more light to Diwali.', detail: 'Gather the traditional essentials for a warm festival of lights with the people you love.', image: 'assets/diwali-scene.png', alt: 'A glowing Diwali pooja arrangement with Lakshmi and Ganesh', eyebrow: 'THE FESTIVAL OF LIGHTS', action: 'Explore Diwali pooja', to: '/product/diwali-pooja-kit', position: 'center 52%' },
  { title: 'Nine nights. One beautiful celebration.', detail: 'A ritual-led collection inspired by Navratri and the traditions that bring us together.', image: 'assets/navratri-scene.png', alt: 'A Navratri kalash with coconut, flowers and lamps', eyebrow: 'NAVRATRI', action: 'Explore Navratri pooja', to: '/product/navratri-pooja-kit', position: 'center 50%' },
]

export function OccasionCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const interactionPaused = paused || hovered || focused

  useEffect(() => {
    if (interactionPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [interactionPaused])

  const previous = () => setActive(index => (index - 1 + slides.length) % slides.length)
  const next = () => setActive(index => (index + 1) % slides.length)

  return <section className="home-carousel" aria-roledescription="carousel" aria-label="Pooja kits for meaningful moments" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false) }}>
    {slides.map((slide, index) => <article key={slide.image} className={`carousel-slide ${active === index ? 'is-active' : ''}`} aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`} aria-hidden={active !== index}>
      <img className="carousel-image" src={`/${slide.image}`} alt={slide.alt} style={{ objectPosition: slide.position }} fetchPriority={index === 0 ? 'high' : 'auto'} />
      <div className="carousel-copy" aria-live={active === index && !interactionPaused ? 'off' : 'polite'}>
        <span className="carousel-eyebrow"><i />{slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.detail}</p>
        <Link to={slide.to} tabIndex={active === index ? 0 : -1} className="btn carousel-cta">{slide.action}<span aria-hidden="true">&rarr;</span></Link>
      </div>
    </article>)}
    <div className="carousel-controls">
      <button type="button" className="carousel-arrow" onClick={previous} aria-label="Previous occasion">&larr;</button>
      <div className="carousel-dots" role="group" aria-label="Choose a slide">{slides.map((slide, index) => <button type="button" key={slide.image} onClick={() => setActive(index)} className={active === index ? 'active' : ''} aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`} aria-current={active === index ? 'true' : undefined} />)}</div>
      <span className="carousel-position">0{active + 1}<span> / 0{slides.length}</span></span>
      <button type="button" className="carousel-arrow" onClick={next} aria-label="Next occasion">&rarr;</button>
      <button type="button" className="carousel-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume automatic slides' : 'Pause automatic slides'}>{paused ? 'Play' : 'Pause'}</button>
    </div>
  </section>
}
