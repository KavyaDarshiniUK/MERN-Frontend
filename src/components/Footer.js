import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-kc">KC</span>
              <span>Kavya Cosmetics</span>
            </div>
            <p>Beauty that speaks your language. Discover premium cosmetics crafted for every skin tone and style.</p>
            <div className="social-links">
              <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#!" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#!" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#!" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/shop">Lips</Link></li>
              <li><Link to="/shop">Eyes</Link></li>
              <li><Link to="/shop">Face</Link></li>
              <li><Link to="/shop">Skincare</Link></li>
              <li><Link to="/shop">Fragrance</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><a href="#!">Track Order</a></li>
              <li><a href="#!">Returns & Exchange</a></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col footer-newsletter">
            <h4>Stay Gorgeous</h4>
            <p>Get beauty tips & exclusive offers straight to your inbox.</p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2024 KC Kavya Cosmetics. All rights reserved. | Made with <span style={{color:'#c8637a'}}>♥</span> for beauty lovers</p>
          <div className="payment-icons">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>PayTM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
