// frontend/src/pages/HomePage.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import '../index.css';

const HomePage = () => {
  return (
    <>

      <main>
        <section className="hero">
          <p>
            Sunsets frequently symbolise transitions, serving as metaphors for both endings and new beginnings.
            They signify spiritual awakenings and the replenishment of strength as day turns to night.
          </p>
        </section>

        <section className="containers">
          <h3>The Peace of the Sunset</h3>
          <p>
            In a world that is always moving, the sunset is my favorite time to stop and relax for a moment.
            The peace of sunset offers a daily opportunity for reflection, mindfulness, and emotional reset,
            signaling a gentle pause in life’s frantic pace. It serves as a natural, calming, and transformative
            moment that encourages gratitude, letting go of daily stresses, and finding beauty in endings.
          </p>

          <h3>What I enjoy most:</h3>
          <ul>
            <li>The quiet feeling of the evening air.</li>
            <li>The way the bright colors make the world look beautiful.</li>
            <li>The peaceful feeling of knowing the day is done.</li>
          </ul>
        </section>

        <section className="card-container">
          <div className="card">
            <h4>My Passion</h4>
            <p>Learn more about why I love sunsets.</p>
            <a href="/about">Learn More</a>
          </div>
          <div className="card">
            <h4>Sign Up</h4>
            <p>Join me in finding a moment of peace.</p>
            <a href="/contact">View Resources</a>
          </div>
        </section>
      </main>

      <footer>
        <p>Contact: angmmd@gmail.com | &copy; 2026 Thea's Portfolio - All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;
