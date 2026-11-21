import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../components/products';
import { useCart } from '../components/CartContext';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import TryOnPreview from '../components/TryOnPreview';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedShade, setSelectedShade] = useState(product?.shades?.[0] || '');
  const [added, setAdded] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);

  if (!product) return (
    <div className="page-wrapper" style={{textAlign:'center',padding:'100px 20px'}}>
      <h2>Product not found</h2>
      <Link to="/shop" className="btn-primary" style={{display:'inline-block',marginTop:'20px'}}>Back to Shop</Link>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/shop">Shop</Link> <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Image */}
          <div className="pd-image-wrap">
            <ProductImage product={product} className="pd-main-img" />
            {product.badge && <span className="pd-badge">{product.badge}</span>}
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating">
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price}</span>
              <span className="pd-orig">₹{product.originalPrice}</span>
              <span className="pd-disc">{discount}% OFF</span>
            </div>

            <p className="pd-desc">{product.description}</p>

            {product.shades && product.shades.length > 0 && (
              <div className="pd-shades">
                <p className="pd-label">Shade: <strong>{selectedShade}</strong></p>
                <div className="shades-list">
                  {product.shades.map(shade => (
                    <button
                      key={shade}
                      className={`shade-btn ${selectedShade === shade ? 'active' : ''}`}
                      onClick={() => setSelectedShade(shade)}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {['Lips', 'Eyes', 'Face'].includes(product.category) && (
              <div className="pd-try-on">
                <button
                  type="button"
                  className="pd-try-on-toggle"
                  aria-expanded={showTryOn}
                  onClick={() => setShowTryOn(open => !open)}
                >
                  {showTryOn ? 'Close Try On' : '✨ Try On Me'}
                </button>
                {showTryOn && <TryOnPreview product={product} shade={selectedShade} />}
              </div>
            )}

            <div className="pd-qty">
              <p className="pd-label">Quantity</p>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="btn-primary pd-add-btn" onClick={handleAddToCart}>
                {added ? '✓ Added to Bag!' : '🛍 Add to Bag'}
              </button>
              <button
                className={`pd-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <i className={isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
            </div>

            <div className="pd-features">
              <div className="pd-feat"><span>🌿</span> Cruelty Free</div>
              <div className="pd-feat"><span>🚚</span> Free Shipping ₹999+</div>
              <div className="pd-feat"><span>🔄</span> Easy Returns</div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="related-section">
            <div className="section-title">
              <h2>You May Also Like</h2>
              <div className="underline"></div>
            </div>
            <div className="related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
