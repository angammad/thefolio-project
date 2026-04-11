// frontend/src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  return (
    <>
      <nav className="navbar">
        <Link to="/home">🌅 Serenity</Link>
  
        <div>
          <Link to="/home">Home</Link>
  
          {!user ? (
            <>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/game">Game</Link>
            </>
          ) : (
            <>
              <Link to="/create-post">Write Post</Link>
              <Link to="/profile">Profile</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button onClick={() => {
                logout();
                navigate('/');
              }}>
                Logout
              </button>
            </>
          )}
          
          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;