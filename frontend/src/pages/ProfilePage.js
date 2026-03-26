// frontend/src/pages/ProfilePage.js

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const handleProfile = async (e) => {
    e.preventDefault(); setMsg('');
    const fd = new FormData();
    fd.append('name', name); fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data); setMsg('Profile updated!');
    } catch (err) { setMsg(err.response?.data?.message || 'Error'); }
  };
  
  const handlePassword = async (e) => {
    e.preventDefault(); setMsg('');
    
    try {
      await API.put('/auth/change-password', { currentPassword: curPw,
      newPassword: newPw });
      setMsg('Password changed!'); setCurPw(''); setNewPw('');
    } catch (err) { setMsg(err.response?.data?.message || 'Error'); }
  };
  
  const picSrc = user?.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : '/default-avatar.png';
  
  return (
    <div className='profile-page'>
      <h2>My Profile</h2>
      <img src={picSrc} alt='Profile' className='profile-pic-preview' />
      {msg && <p className='success-msg'>{msg}</p>}
      <form onSubmit={handleProfile}>
        <h3>Edit Profile</h3>
        <input value={name} onChange={e => setName(e.target.value)}
        placeholder='Name' />
        <textarea value={bio} onChange={e => setBio(e.target.value)}
        placeholder='Bio' rows={3} />
        <input type='file' accept='image/*' onChange={e =>
        setPic(e.target.files[0])} />
        <button type='submit'>Save Profile</button>
      </form>
      
      <form onSubmit={handlePassword}>
        <h3>Change Password</h3>
        <input type='password' placeholder='Current password' value={curPw}
        onChange={e => setCurPw(e.target.value)} required />
        <input type='password' placeholder='New password' value={newPw}
        onChange={e => setNewPw(e.target.value)} required />
        <button type='submit'>Change Password</button>
      </form>
    </div>
  );
};
export default ProfilePage;