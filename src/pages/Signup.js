import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { heroImage } from '../assets/images';
import './Auth.css';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agree) {
      setError('Please accept the terms and conditions.');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch("https://mern-backend-5dua.onrender.com/api/users/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirm: form.confirm,
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('The server returned an invalid response.');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Unable to create your account.');
      }

      signup(form.name, form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img src={heroImage} alt="Beauty" />
          <div className="auth-image-overlay">
            <div className="auth-logo">
              <span className="logo-kc">KC</span>
              <span>Kavya Cosmetics</span>
            </div>
            <p>"Glow up. Show up. Own your beauty."</p>
          </div>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-brand">
            <span className="logo-kc-sm">KC</span>
            <span>Kavya Cosmetics</span>
          </div>
          <h2>Create Account ✨</h2>
          <p className="auth-subtitle">Join the KC beauty family</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrap">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
              </div>
            </div>
            <label className="checkbox-label">
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
              I agree to the <a href="#!">Terms</a> and <a href="#!">Privacy Policy</a>
            </label>
            <button type="submit" className="btn-primary auth-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login" state={{ from: redirectTo }}>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
