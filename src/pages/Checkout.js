import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import ProductImage from '../components/ProductImage';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Checkout.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'', state:'', pincode:'' });
  const [payment, setPayment] = useState('upi');
  const [ordered, setOrdered] = useState(false);
  const delivery = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + delivery;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = (e) => {
    e.preventDefault();
    clearCart();
    setOrdered(true);
  };

  if (ordered) return (
    <div className="page-wrapper">
      <div className="order-success">
        <div className="success-icon">🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, <strong>{form.name || 'Beauty Lover'}</strong>! Your order is confirmed.</p>
        <p className="order-id">Order ID: <strong>#KC{Date.now().toString().slice(-6)}</strong></p>
        <p>Expected delivery in 2-4 business days to <strong>{form.city}</strong>.</p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',marginTop:'28px'}}>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-outline">Go Home</Link>
        </div>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="page-wrapper empty-page">
      <div className="empty-content">
        <span className="empty-icon">🛒</span>
        <h2>Nothing to checkout</h2>
        <Link to="/shop" className="btn-primary">Go Shopping</Link>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-heading">Checkout</h1>
        <div className="checkout-steps">
          {['Delivery', 'Payment', 'Review'].map((s, i) => (
            <div key={i} className={`step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="step-num">{step > i + 1 ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-wrap">
            {step === 1 && (
              <form className="checkout-form" onSubmit={e => { e.preventDefault(); setStep(2); }}>
                <h3>Delivery Address</h3>
                <div className="form-row">
                  <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                  <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
                </div>
                <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                <textarea name="address" placeholder="Street Address, Area" value={form.address} onChange={handleChange} required rows={3} />
                <div className="form-row">
                  <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                  <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                  <input name="pincode" placeholder="PIN Code" value={form.pincode} onChange={handleChange} required maxLength={6} />
                </div>
                <button type="submit" className="btn-primary checkout-btn-full">Continue to Payment →</button>
              </form>
            )}

            {step === 2 && (
              <div className="payment-section">
                <h3>Payment Method</h3>
                {['upi', 'card', 'cod', 'netbanking'].map(p => (
                  <label key={p} className={`payment-option ${payment === p ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={p} checked={payment === p} onChange={() => setPayment(p)} />
                    <span className="pay-icon">
                      {p === 'upi' && '📱'}{p === 'card' && '💳'}{p === 'cod' && '💵'}{p === 'netbanking' && '🏦'}
                    </span>
                    <span>{p === 'upi' ? 'UPI (GPay / PhonePe / Paytm)' : p === 'card' ? 'Credit / Debit Card' : p === 'cod' ? 'Cash on Delivery' : 'Net Banking'}</span>
                  </label>
                ))}
                <div className="checkout-nav">
                  <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary" onClick={() => setStep(3)}>Review Order →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleOrder}>
                <h3>Review Your Order</h3>
                <div className="review-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="review-item">
                      <ProductImage product={item} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>Qty: {item.qty} × ₹{item.price}</span>
                      </div>
                      <span className="review-item-total">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <p className="review-addr"><strong>Deliver to:</strong> {form.name}, {form.address}, {form.city} - {form.pincode}</p>
                <p className="review-addr"><strong>Payment:</strong> {payment.toUpperCase()}</p>
                <div className="checkout-nav">
                  <button type="button" className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                  <button type="submit" className="btn-primary">Place Order 🎉</button>
                </div>
              </form>
            )}
          </div>

          {/* Summary */}
          <div className="checkout-summary">
            <h3>Price Details</h3>
            {cartItems.map(item => (
              <div key={item.id} className="summary-row">
                <span>{item.name} × {item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
            <div className="summary-total"><span>Total Payable</span><span>₹{total.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
