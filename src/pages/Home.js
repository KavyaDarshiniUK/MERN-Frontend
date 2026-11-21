import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../components/products';
import { heroImage, heroImageFallback } from '../assets/images';
import './Home.css';

const categories = [
  { name: 'Lips', icon: '💄', color: '#c8637a' },
  { name: 'Eyes', icon: '👁️', color: '#7c5cbf' },
  { name: 'Face', icon: '✨', color: '#d4a853' },
  { name: 'Skincare', icon: '🌸', color: '#5ca87c' },
  { name: 'Fragrance', icon: '🌹', color: '#c86363' },
];

const testimonials = [
  { name: 'Priya S.', text: 'The lipstick shades are absolutely gorgeous! They stay on all day without drying my lips.', rating: 5, avatar: 'P' },
  { name: 'Meera R.', text: 'KC Kavya products have transformed my morning routine. The foundation is perfect for Indian skin!', rating: 5, avatar: 'M' },
  { name: 'Anjali K.', text: 'Love the packaging and the quality. The eyeshadow palette is stunning and blends beautifully.', rating: 5, avatar: 'A' },
];

function Home() {
  const [email, setEmail] = useState('');
  const [carouselPaused, setCarouselPaused] = useState(false);
  const productTrackRef = useRef(null);
  const featured = products.slice(0, 8);

  useEffect(() => {
    const track = productTrackRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!track || carouselPaused || reducedMotion) return undefined;

    const intervalId = window.setInterval(() => {
      if (document.hidden) return;

      const card = track.querySelector('.product-card');
      if (!card) return;

      const gap = parseFloat(window.getComputedStyle(track).columnGap) || 24;
      const step = card.getBoundingClientRect().width + gap;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - step / 2;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: 'smooth',
      });
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [carouselPaused]);

  const scrollProducts = (direction) => {
    const track = productTrackRef.current;
    const card = track && track.querySelector('.product-card');
    if (!track || !card) return;

    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 24;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tag">The Everyday Radiance Edit</span>
            <h1>
              Your glow, <br />
              <span className="gradient-text">your rules.</span>
            </h1>
            <p>Thoughtful beauty essentials, made to celebrate every shade, every mood, and every version of you.</p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">Shop Now</Link>
              <Link to="/about" className="btn-outline">Our Story</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><span>500+</span><p>Products</p></div>
              <div className="stat"><span>50K+</span><p>Happy Customers</p></div>
              <div className="stat"><span>4.8★</span><p>Avg Rating</p></div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-blob"></div>
            <img
              src={heroImage}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = heroImageFallback;
              }}
              alt="A curated collection of makeup essentials"
              className="hero-img"
            />
            <div className="floating-card card1">
              <span>✨</span> Beauty, made for you
              <strong>₹549</strong>
            </div>
            <div className="floating-card card2">
              <span>⭐</span> 4.9 Rating
              <strong>50K Reviews</strong>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" fill="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff9fa"/></svg>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <p>Find exactly what you're looking for</p>
            <div className="underline"></div>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.name} className="category-card">
                <div className="cat-icon" style={{ background: `${cat.color}20`, color: cat.color }}>
                  <span>{cat.icon}</span>
                </div>
                <span className="cat-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Bestsellers loved by thousands</p>
            <div className="underline"></div>
          </div>
          <div className="featured-products-toolbar">
            <p className="carousel-hint">A few favorites to start your ritual</p>
            <div className="carousel-controls">
              <button type="button" aria-label="Previous products" onClick={() => scrollProducts(-1)}>
                <i className="fas fa-arrow-left" aria-hidden="true"></i>
              </button>
              <button type="button" aria-label="Next products" onClick={() => scrollProducts(1)}>
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div
            className="products-track"
            ref={productTrackRef}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocusCapture={() => setCarouselPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setCarouselPaused(false);
              }
            }}
            role="region"
            aria-label="Featured products"
          >
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center" style={{marginTop: '40px'}}>
            <Link to="/shop" className="btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="banner-content">
            <div>
              <h2>Get 30% OFF Your First Order</h2>
              <p>Use code <strong>KAVYA30</strong> at checkout • Free shipping above ₹999</p>
            </div>
            <Link to="/shop" className="btn-banner">Shop the Sale</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why KC Kavya?</h2>
            <p>Quality you can trust, beauty you can feel</p>
            <div className="underline"></div>
          </div>
          <div className="features-grid">
            {[
              { icon: '🌿', title: 'Cruelty Free', desc: 'All our products are 100% cruelty-free and ethically sourced.' },
              { icon: '💎', title: 'Premium Quality', desc: 'Dermatologist tested formulas for all skin types.' },
              { icon: '🚀', title: 'Fast Delivery', desc: 'Get your favorites delivered within 2-4 business days.' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free returns. Your satisfaction guaranteed.' },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-title">
            <h2>What Our Customers Say</h2>
            <p>Real reviews from real beauty lovers</p>
            <div className="underline"></div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="t-stars">{'⭐'.repeat(t.rating)}</div>
                <p className="t-text">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.avatar}</div>
                  <strong>{t.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <h2>Join the Beauty Club</h2>
            <p>Get exclusive deals, beauty tips, and new arrival alerts.</p>
            <form className="nl-form" onSubmit={e => { e.preventDefault(); setEmail(''); alert('Thank you for subscribing! 💄'); }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
