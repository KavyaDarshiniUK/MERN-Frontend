import React from 'react';
import { Link } from 'react-router-dom';
import { heroImage } from '../assets/images';
import './About.css';

const team = [
  { name: 'Kavya Sharma', role: 'Founder & CEO', emoji: '👩‍💼', bio: 'Passionate beauty entrepreneur with 10+ years in cosmetics.' },
  { name: 'Priya Rajan', role: 'Head of Product', emoji: '🧪', bio: 'Formulation expert ensuring every product meets premium standards.' },
  { name: 'Meera Nair', role: 'Creative Director', emoji: '🎨', bio: 'Visual storyteller behind every KC campaign and design.' },
  { name: 'Anjali Verma', role: 'Customer Experience', emoji: '💝', bio: 'Making sure every KC customer feels beautiful and valued.' },
];

function About() {
  return (
    <div className="page-wrapper about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-text">
              <span className="section-tag">Our Story</span>
              <h1>Born From a Passion <span className="gradient-text">For Beauty</span></h1>
              <p>KC Kavya Cosmetics was founded with one dream — to make premium, inclusive beauty accessible to every woman in India. We believe that great makeup should celebrate your natural beauty, not hide it.</p>
              <p>From our first lipstick to a full range of 500+ products, we've stayed true to our commitment: clean formulations, vibrant shades, and products that truly work on Indian skin tones.</p>
              <div className="about-stats">
                <div className="a-stat"><span>2015</span><p>Founded</p></div>
                <div className="a-stat"><span>500+</span><p>Products</p></div>
                <div className="a-stat"><span>50K+</span><p>Customers</p></div>
                <div className="a-stat"><span>4.8★</span><p>Rating</p></div>
              </div>
            </div>
            <div className="about-hero-img">
              <img src={heroImage} alt="Kavya" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-title">
            <h2>What We Stand For</h2>
            <p>Our values shape every product we create</p>
            <div className="underline"></div>
          </div>
          <div className="values-grid">
            {[
              { icon: '🌿', title: 'Cruelty Free', desc: 'We never test on animals. Ever. Our entire range is certified cruelty-free.' },
              { icon: '🌍', title: 'Inclusive Beauty', desc: 'Products for every skin tone, from the fairest ivory to the richest espresso.' },
              { icon: '💚', title: 'Clean Ingredients', desc: 'No parabens, no sulfates. Formulated with safe, skin-loving ingredients.' },
              { icon: '♻️', title: 'Sustainable', desc: 'Eco-friendly packaging and a commitment to reducing our carbon footprint.' },
              { icon: '🔬', title: 'Dermatologist Tested', desc: 'Every product is tested and approved by certified dermatologists.' },
              { icon: '🇮🇳', title: 'Made in India', desc: 'Proudly Indian, crafted keeping Indian climate and skin types in mind.' },
            ].map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-title">
            <h2>Meet the Team</h2>
            <p>The beautiful minds behind KC Kavya</p>
            <div className="underline"></div>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{member.emoji}</div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Glow?</h2>
            <p>Explore our latest collection and discover your perfect shade.</p>
            <Link to="/shop" className="btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
