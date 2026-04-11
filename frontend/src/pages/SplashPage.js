// src/pages/SplashPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate();

  const [dotCount, setDotCount] = useState(3);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('loaded')) {
      navigate('/home');
      return;
    }

    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    const splashTimer = setTimeout(() => {
      clearInterval(dotInterval);
      setFadeOut(true);

      setTimeout(() => {
        sessionStorage.setItem('loaded', 'true');
        navigate('/home');
      }, 600);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(splashTimer);
    };
  }, [navigate]);

  return (
    <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-card">
        <div className="logo">🌅</div>

        <h1 className="splash-title">Welcome to Serenity</h1>

        <p className="splash-subtitle">
          Your modern space for stories, creativity, and inspiration
        </p>

        <div className="spinner"></div>

        <p className="loading-text">
          Loading<span className="dots">{'.'.repeat(dotCount)}</span>
        </p>
      </div>
    </div>
  );
};

export default SplashPage;