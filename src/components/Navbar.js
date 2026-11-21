import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlistItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-kc">KC</span>
          <span className="logo-text">Kavya Cosmetics</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        </ul>

        {/* Nav Icons */}
        <div className="nav-icons">
          <Link to="/wishlist" className="icon-btn" title="Wishlist">
            <i className="fas fa-heart"></i>
            {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" title="Cart">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="icon-btn user-icon" title="Profile">
                <i className="fas fa-user-circle"></i>
                <span className="user-name">{user.name}</span>
              </Link>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-nav-login">Login</Link>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
