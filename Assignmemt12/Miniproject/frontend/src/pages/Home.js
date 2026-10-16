
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <div className="hero-tag">
        <span>✦</span> YOUR CAMPUS COMMUNITY
      </div>

      <h1>
        Lost something?
        <br />
        <span>Let's find it together.</span>
      </h1>

      <p className="hero-description">
        A lost item shouldn't mean a lost day. Report missing belongings,
        share things you've found, and help make your campus a more helpful
        place for everyone.
      </p>

      <div className="hero-actions">
        <Link to="/report" className="button">
          + Report an Item
        </Link>
        <Link to="/items" className="button button-secondary">
          Browse Items →
        </Link>
      </div>

      <h2 className="features-heading">How it works</h2>

      <div className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Report an Item</h3>
          <p>
            Lost your ID card, wallet, or keys? Submit the item details
            so other students can help.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">🔎</div>
          <h3>Browse & Search</h3>
          <p>
            Explore reported items and search by name to find belongings
            reported by your campus community.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Return & Reunite</h3>
          <p>
            Use the provided contact information to coordinate with
            the owner and mark an item as returned.
          </p>
        </article>
      </div>
    </main>
  );
}

export default Home;
