// frontend/src/pages/LoginPage.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
   
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <div className='login-page'>
      <h2>Login to TheFolio</h2>
      {error && <p className='error-msg'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email} onChange={e =>
        setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
        <button type='submit'>Login</button>
      </form>
      <p>No account? <Link to='/register'>Register</Link></p>
    </div>
  );
};
export default LoginPage;
