import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const questions = [
  {
    question: 'Can I place a real order on this website?',
    answer: 'Not currently. This is a demonstration storefront; checkout and order confirmation are simulated and no payment or shipment is created.'
  },
  {
    question: 'How do I find the right product shade?',
    answer: 'Product listings include shade options where available. Screen settings can affect how colors appear, so displayed shades may not exactly match the product in person.'
  },
  {
    question: 'Can I create an account?',
    answer: 'Sign-up and login are demo interactions only. They do not create a real account, and you should not use a real password on this site.'
  },
  {
    question: 'How do the cart and wishlist work?',
    answer: 'They let you try the shopping experience in the current browser session. Items are not submitted to a store or saved as customer records.'
  },
  {
    question: 'Are payments or refunds processed?',
    answer: 'No. The payment choices shown at checkout are examples only. This site does not collect payment details or process refunds.'
  },
  {
    question: 'How can I ask another question?',
    answer: 'Use the Contact page to view the available contact details and message form. The form is part of the demo and does not transmit messages.'
  }
];

function FAQ() {
  return (
    <div className="page-wrapper policy-page">
      <div className="container">
        <header className="policy-header">
          <h1>Frequently Asked Questions</h1>
          <p>Helpful information about shopping with KC Kavya Cosmetics.</p>
        </header>

        <div className="policy-content faq-list">
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
          <p>
            Still need help? Visit our <Link to="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
