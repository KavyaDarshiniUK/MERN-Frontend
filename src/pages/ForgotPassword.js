import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-container auth-single">
        <div className="auth-form-wrap centered">
          <div className="forgot-icon">🔑</div>
          <h2>Forgot Password?</h2>
          <p className="auth-subtitle">No worries! Enter your email and we'll send you a reset link.</p>

          {sent ? (
            <div className="sent-box">
              <div className="sent-icon">📧</div>
              <h3>Check Your Email</h3>
              <p>We've sent a password reset link to <strong>{email}</strong></p>
              <p>Didn't receive it? Check your spam folder.</p>
              <Link to="/login" className="btn-primary" style={{display:'inline-block',marginTop:'20px'}}>Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrap">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary auth-btn">Send Reset Link</button>
              <div style={{textAlign:'center',marginTop:'16px'}}>
                <Link to="/login" className="forgot-link">← Back to Sign In</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
