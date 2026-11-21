import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-wrapper">
      <div className="contact-hero">
        <div className="container">
          <h1>Get in Touch 💬</h1>
          <p>We'd love to hear from you. Our team is ready to help!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          {/* Info */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Reach us through any of the below channels. We respond within 24 hours.</p>

            <div className="contact-cards">
              {[
                { icon: '📍', title: 'Visit Us', text: '123 Beauty Lane, Koramangala\nBangalore, Karnataka 560034' },
                { icon: '📞', title: 'Call Us', text: '+91 98765 43210\n+91 80 2345 6789' },
                { icon: '✉️', title: 'Email Us', text: 'hello@kckavyacosmetics.com\nsupport@kckavya.com' },
                { icon: '🕐', title: 'Working Hours', text: 'Mon - Sat: 9 AM - 7 PM\nSunday: 10 AM - 5 PM' },
              ].map((c, i) => (
                <div key={i} className="contact-card">
                  <span className="contact-card-icon">{c.icon}</span>
                  <div>
                    <h4>{c.title}</h4>
                    <p style={{whiteSpace:'pre-line'}}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <h4>Follow Us</h4>
              <div className="social-row">
                <a href="#!" className="sc-btn ig"><i className="fab fa-instagram"></i> Instagram</a>
                <a href="#!" className="sc-btn fb"><i className="fab fa-facebook"></i> Facebook</a>
                <a href="#!" className="sc-btn yt"><i className="fab fa-youtube"></i> YouTube</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <h2>Send a Message</h2>
            {sent && <div className="alert alert-success">✅ Message sent! We'll reply within 24 hours.</div>}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                  <option value="">Choose a subject</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Returns & Refunds</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="How can we help you?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={5}></textarea>
              </div>
              <button type="submit" className="btn-primary contact-submit">Send Message 🚀</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
