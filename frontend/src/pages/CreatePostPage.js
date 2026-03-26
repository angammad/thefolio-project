// frontend/src/pages/CreatePostPage.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth(); const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    const fd = new FormData();
    fd.append('title', title); fd.append('body', body);
    if (image) fd.append('image', image);
    
    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) { setError(err.response?.data?.message || 'Failed'); }
  };
  
  return (
    <div className='create-post-page'>
      <h2>New Post</h2>
      {error && <p className='error-msg'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)}
        placeholder='Title' required />
        <textarea value={body} onChange={e => setBody(e.target.value)}
        placeholder='Write your post...' rows={10} required />
        {user?.role === 'admin' && (
          <><label>Cover Image (Admin only):</label>
          <input type='file' accept='image/*' onChange={e =>
          setImage(e.target.files[0])} /></>
        )}
        <button type='submit'>Publish</button>
      </form>
    </div>
  );
};
export default CreatePostPage;