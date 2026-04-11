import { useState } from "react";

const AboutPage = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>A Moment of Calmness</h1>
          <p>
            Sunsets remind me to slow down and enjoy the present moment.
          </p>
        </div>

        <img
          src="http://localhost:5000/uploads/S1.jpg"
          alt="Sunset"
          className="about-main-image"
        />
      </section>

      {/* JOURNEY */}
      <section className="about-section">
        <h2>My Journey</h2>

        <p>
          I look at sunsets because I wanted to feel less stressed. At first,
          I just watched them for a few minutes. Soon, I realized those moments
          were the best part of my day.
        </p>

        <p>
          I began learning why the sky changes colors and how to find the best
          sunset views.
        </p>

        {/* TIMELINE CARD STYLE */}
        <div className="timeline-card">
          <h3>My Timeline</h3>
          <ol>
            <li>Watching the sky every day after school</li>
            <li>Learned basic mobile photography</li>
            <li>Created this project to share peace and calmness</li>
          </ol>
        </div>

        {/* GALLERY */}
        <div className="gallery-grid">
          <img src="http://localhost:5000/uploads/S2.jpg" alt="" />
          <img src="http://localhost:5000/uploads/S3.jpg" alt="" />
          <img src="http://localhost:5000/uploads/S5.jpg" alt="" />
        </div>

        {/* QUOTE */}
        <blockquote className="about-quote">
          “Sunsets are a reminder that no matter what happens, the day can end in a beautiful way.”
        </blockquote>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        Contact: angmmd@gmail.com | © 2026 Thea's Portfolio - All Rights Reserved.
      </footer>
    </div>
  );
};

export default AboutPage;