// frontend/src/components/Nav.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

const Nav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleMode = () => setDarkMode(prev => !prev);

  return (
    <header>
      <h1>🌅 SERENITY</h1>
      <nav>
        <Link className={location.pathname === '/home' ? 'active' : ''} to="/">Home</Link>
        <Link className={location.pathname === '/about' ? 'active' : ''} to="/about">About</Link>
        <Link className={location.pathname === '/contact' ? 'active' : ''} to="/contact">Contact</Link>
        <Link className={location.pathname === '/register' ? 'active' : ''} to="/register">Register</Link>
      </nav>
      <div className="toggle" onClick={toggleMode}>
        {darkMode ? '🌙' : '☀️'}
      </div>
    </header>
  );
};

export default Nav;

