// frontend/src/pages/RegisterPage.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import Nav from '../components/Nav';
import '../index.css';

const RegisterPage = () => {

  // Form state
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    dob: '',
    level: 'Beginner',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle radio buttons
  const handleLevelChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      level: e.target.value,
    }));
  };

  // Form validation
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.agree) newErrors.agree = 'You must agree before joining';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess('You are successfully registered! 🌅');
      setTimeout(() => setSuccess(''), 3000);
      setFormData({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        dob: '',
        level: 'Beginner',
        agree: false,
      });
    }
  };

  return (
    <>
      <Nav />

      <main>
        <section className="containers" style={{ textAlign: 'center' }}>
          <h2>Join the Community</h2>
          <p>
            By signing up, you’ll receive calming sunset photos and gentle reminders to pause, breathe, and enjoy
            the moment.
          </p>
        </section>

        <section className="containers">
          <form onSubmit={handleSubmit}>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p className="error">{errors.fullname}</p>}

            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <p id="info" className={success ? 'show' : ''}>
              <span className="checkmark">✔</span>
              <span className="success-text">{success}</span>
            </p>

            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className="error">{errors.dob}</p>}
            
            <p><strong>Your Goal:</strong></p>
            <div style={{ margin: '10px 0' }}>
              <input
              type="radio"
              name="level"
              value="Beginner"
              checked={formData.level === 'Beginner'}
              onChange={handleLevelChange}
              style={{ width: 'auto' }}
              />{' '}
              Beginner
              
              <input
              type="radio"
              name="level"
              value="Intermediate"
              checked={formData.level === 'Intermediate'}
              onChange={handleLevelChange}
              style={{ width: 'auto', marginLeft: '10px' }}
              />{' '}
              Intermediate
              
              <input
              type="radio"
              name="level"
              value="Expert"
              checked={formData.level === 'Expert'}
              onChange={handleLevelChange}
              style={{ width: 'auto', marginLeft: '10px' }}
              />{' '}
              Expert
            </div>

            <label>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                style={{ width: 'auto' }}
              />{' '}
              I agree to receive reminders.
            </label>
            {errors.agree && <p className="error">{errors.agree}</p>}
            
            <button type="submit" style={{ width: '100%', marginTop: '20px' }}>
              Join Now
            </button>
          </form>
        </section>
      </main>

      <footer>
        <p>Contact: angmmd@gmail.com | &copy; 2026 Thea's Portfolio – All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default RegisterPage;