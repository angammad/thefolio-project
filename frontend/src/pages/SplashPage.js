// frontend/src/pages/SplashPage.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css'; // Import CSS for styling

function SplashPage() {
  const navigate = useNavigate();
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    // If already loaded, navigate to home
    if (sessionStorage.getItem('loaded')) {
      navigate('/home');
      return;
    }

    // Dot animation
    const dotInterval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    // Fade out and redirect after 3 seconds
    const timeout = setTimeout(() => {
      clearInterval(dotInterval);
      document.querySelector('.loader-container').classList.add('fade-out');
      setTimeout(() => {
        sessionStorage.setItem('loaded', 'true');
        navigate('/home');
      }, 500);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="loader-container">
      <div className="logo">🌅</div>
      <h1>Welcome To Serenity</h1>
      <div className="spinner"></div>
      <div className="loading-text">
        Loading
        <span className="dots">{'.'.repeat(dotCount)}</span>
      </div>
    </div>
  );
}

export default SplashPage;