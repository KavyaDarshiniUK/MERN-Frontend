import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

function PrivacyPolicy() {
  return (
    <div className="page-wrapper policy-page">
      <div className="container">
        <header className="policy-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: November 19, 2026</p>
        </header>

        <article className="policy-content">
          <section>
            <h2>About this policy</h2>
            <p>
              This page describes how information is handled when you use the KC
              Kavya Cosmetics demo website. The site does not currently connect to
              a server or customer database.
            </p>
          </section>
          <section>
            <h2>Information you enter</h2>
            <p>
              Forms on this demo, including sign-in, contact, newsletter, and
              checkout forms, do not send your entries to us. Account, cart,
              wishlist, and order interactions are simulated in the browser and
              are not saved as customer records.
            </p>
            <p>
              Please do not enter real passwords, payment card details, or
              sensitive personal information into this demonstration site.
            </p>
          </section>
          <section>
            <h2>Cookies and tracking</h2>
            <p>
              This application does not implement its own analytics, advertising
              trackers, or cookie-based account storage. Your browser or hosting
              environment may process basic technical information to load the
              website.
            </p>
          </section>
          <section>
            <h2>Third-party services</h2>
            <p>
              Some assets or fonts may be loaded from third-party providers. Those
              providers may receive technical request information when your
              browser requests their content; please consult their privacy notices
              for details.
            </p>
          </section>
          <section>
            <h2>Updates and contact</h2>
            <p>
              This policy may be updated as the site changes. If this storefront is
              connected to real accounts, orders, analytics, or payment services,
              this policy must be revised to accurately describe that processing.
              For questions, visit our <Link to="/contact">Contact</Link> page.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
