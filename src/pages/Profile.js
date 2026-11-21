import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useCart } from '../components/CartContext';
import ProductImage from '../components/ProductImage';
import './Profile.css';

const mockOrders = [
  { id: 'KC241001', date: '01 Nov 2024', items: 'Velvet Matte Lipstick, Rose Gold Palette', total: 1448, status: 'Delivered' },
  { id: 'KC241023', date: '23 Oct 2024', items: 'Glow Serum Foundation', total: 1199, status: 'Shipped' },
  { id: 'KC241005', date: '05 Oct 2024', items: 'Vitamin C Serum, Hydra Moisturizer', total: 1748, status: 'Delivered' },
];

function Profile() {
  const { user, logout } = useAuth();
  const { cartItems, wishlistItems } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="page-wrapper empty-page">
        <div className="empty-content">
          <span className="empty-icon">🔐</span>
          <h2>Please log in to view your profile</h2>
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-circle">{user.name.charAt(0).toUpperCase()}</div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <nav className="profile-nav">
              {[
                { id: 'overview', label: 'Overview', icon: '👤' },
                { id: 'orders', label: 'My Orders', icon: '📦' },
                { id: 'wishlist', label: 'Wishlist', icon: '💝' },
                { id: 'settings', label: 'Settings', icon: '⚙️' },
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
              <button className="profile-tab logout-tab" onClick={handleLogout}>
                <span>🚪</span> Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="profile-content">
            {activeTab === 'overview' && (
              <div>
                <h2>Welcome back, {user.name}! 💄</h2>
                <div className="overview-cards">
                  <div className="ov-card">
                    <span className="ov-icon">📦</span>
                    <span className="ov-num">{mockOrders.length}</span>
                    <span>Total Orders</span>
                  </div>
                  <div className="ov-card">
                    <span className="ov-icon">🛍️</span>
                    <span className="ov-num">{cartItems.length}</span>
                    <span>Items in Cart</span>
                  </div>
                  <div className="ov-card">
                    <span className="ov-icon">💝</span>
                    <span className="ov-num">{wishlistItems.length}</span>
                    <span>Wishlist Items</span>
                  </div>
                  <div className="ov-card">
                    <span className="ov-icon">🌟</span>
                    <span className="ov-num">Gold</span>
                    <span>Member Level</span>
                  </div>
                </div>
                <div className="quick-links-row">
                  <Link to="/shop" className="quick-link-btn">🛒 Shop Now</Link>
                  <Link to="/cart" className="quick-link-btn">🛍️ View Cart</Link>
                  <Link to="/wishlist" className="quick-link-btn">💝 Wishlist</Link>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2>My Orders</h2>
                <div className="orders-list">
                  {mockOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <span className="order-id">#{order.id}</span>
                        <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                      <p className="order-items">{order.items}</p>
                      <div className="order-footer">
                        <span className="order-date">{order.date}</span>
                        <span className="order-total">₹{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2>My Wishlist</h2>
                {wishlistItems.length === 0 ? (
                  <div className="empty-tab">
                    <span>💝</span>
                    <p>Your wishlist is empty.</p>
                    <Link to="/shop" className="btn-primary">Start Exploring</Link>
                  </div>
                ) : (
                  <div className="profile-wishlist-grid">
                    {wishlistItems.map(item => (
                      <Link key={item.id} to={`/product/${item.id}`} className="pw-item">
                        <ProductImage product={item} />
                        <div>
                          <strong>{item.name}</strong>
                          <span>₹{item.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2>Account Settings</h2>
                <form className="settings-form" onSubmit={e => { e.preventDefault(); alert('Settings saved!'); }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={user.name} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={user.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password" />
                  </div>
                  <button type="submit" className="btn-primary">Save Changes</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
