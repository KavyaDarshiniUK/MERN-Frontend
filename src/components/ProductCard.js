import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import ProductImage from './ProductImage';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <div className="product-img-wrap">
        <ProductImage product={product} className="product-img" />
        <div className="product-overlay">
          <Link to={`/product/${product.id}`} className="overlay-btn">Quick View</Link>
        </div>
        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          <i className={inWishlist ? 'fas fa-heart' : 'far fa-heart'}></i>
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span>({product.reviews})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹{product.price}</span>
          <span className="product-orig">₹{product.originalPrice}</span>
          <span className="product-discount">{discount}% off</span>
        </div>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <i className="fas fa-shopping-bag"></i> Add to Bag
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
