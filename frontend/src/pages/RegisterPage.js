// frontend/src/pages/RegisterPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    dob: '',
    level: 'Beginner',
    agree: false
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!form.name || !form.username || !form.password || !form.confirmPassword || !form.dob) {
      setError('Please fill all fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!form.agree) {
      setError('You must agree before joining');
      return;
    }

    try {
      const { data } = await API.post('/auth/register', {
        name: form.name,
        email: form.username,
        password: form.password
      });

      localStorage.setItem('token', data.token);

      setSuccess('You are successfully registered! 🌅');

      setTimeout(() => navigate('/home'), 1500);

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">
          <h2>Create Account 🌅</h2>
          <p>Join the Serenity community and enjoy peaceful moments.</p>
        </div>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit} className="register-form">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="username"
            placeholder="Email Address"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />

          <div className="goal-section">
            <p>Your Goal:</p>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="level"
                  value="Beginner"
                  checked={form.level === 'Beginner'}
                  onChange={handleChange}
                />
                Beginner
              </label>

              <label>
                <input
                  type="radio"
                  name="level"
                  value="Intermediate"
                  checked={form.level === 'Intermediate'}
                  onChange={handleChange}
                />
                Intermediate
              </label>

              <label>
                <input
                  type="radio"
                  name="level"
                  value="Expert"
                  checked={form.level === 'Expert'}
                  onChange={handleChange}
                />
                Expert
              </label>

            </div>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            I agree to receive reminders.
          </label>

          <button type="submit">
            Join Now
          </button>

        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
};

export default RegisterPage;