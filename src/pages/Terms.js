import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

function Terms() {
  return (
    <div className="page-wrapper policy-page">
      <div className="container">
        <header className="policy-header">
          <h1>Terms &amp; Conditions</h1>
          <p>Last updated: November 19, 2026</p>
        </header>

        <article className="policy-content">
          <section>
            <h2>About these terms</h2>
            <p>
              These terms explain the rules for using the KC Kavya Cosmetics website.
              By browsing this site, you agree to use it lawfully and not interfere
              with its operation or other visitors’ use.
            </p>
          </section>
          <section>
            <h2>Products and information</h2>
            <p>
              We aim to present products, prices, shades, and descriptions accurately.
              Product colors may look different depending on your screen. Website
              content is provided for general information and may be updated without
              notice.
            </p>
          </section>
          <section>
            <h2>Orders and payment</h2>
            <p>
              This website is currently a demonstration storefront. Checkout,
              payment options, order confirmations, and delivery estimates are
              examples only; orders and payments are not actually processed.
            </p>
          </section>
          <section>
            <h2>Accounts and acceptable use</h2>
            <p>
              Account sign-in on this demo is simulated and is not connected to a
              customer account service. Do not submit real passwords, payment
              information, or other sensitive personal information. You are
              responsible for using the site in compliance with applicable laws.
            </p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>
              Site design, text, graphics, and branding are presented for this
              storefront. Do not copy or reuse materials unless you have permission
              or another legal right to do so.
            </p>
          </section>
          <section>
            <h2>Liability and changes</h2>
            <p>
              The demo is provided “as is” for demonstration purposes and may be
              changed or unavailable at any time. These terms should be reviewed
              and adapted before using this site to conduct real business.
            </p>
          </section>
          <section>
            <h2>Questions</h2>
            <p>
              For questions about these terms, visit our <Link to="/contact">Contact</Link> page.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

export default Terms;
