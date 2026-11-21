import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { heroImage } from '../assets/images';
import './Auth.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('The server returned an invalid response.');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Unable to sign in.');
      }
      if (!result.user || typeof result.user.email !== 'string' || typeof result.user.name !== 'string') {
        throw new Error('The server returned invalid account information.');
      }

      login(result.user);
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
            <p>"Beauty is about being comfortable in your own skin."</p>
          </div>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-brand">
            <span className="logo-kc-sm">KC</span>
            <span>Kavya Cosmetics</span>
          </div>
          <h2>Welcome Back! 💄</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>
            <button type="submit" className="btn-primary auth-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-btns">
              <button className="social-btn"><i className="fab fa-google"></i> Google</button>
              <button className="social-btn"><i className="fab fa-facebook"></i> Facebook</button>
            </div>
          </div>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup" state={{ from: redirectTo }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
