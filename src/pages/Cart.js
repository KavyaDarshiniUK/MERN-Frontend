import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import ProductImage from '../components/ProductImage';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const delivery = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + delivery;

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper empty-page">
        <div className="empty-content">
          <span className="empty-icon">🛍️</span>
          <h2>Your bag is empty</h2>
          <p>Add some beautiful products to your bag.</p>
          <Link to="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-heading">Shopping Bag ({cartItems.length} items)</h1>
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <ProductImage product={item} className="cart-item-img" />
                <div className="cart-item-info">
                  <span className="item-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p className="item-price">₹{item.price}</p>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="item-total">₹{(item.price * item.qty).toLocaleString()}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? <span className="free">FREE</span> : `₹${delivery}`}</span></div>
            {delivery > 0 && <p className="free-shipping-note">Add ₹{(999 - cartTotal).toFixed(0)} more for free delivery!</p>}
            <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            <button type="button" className="btn-primary checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
