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
    <div className="create-post-wrapper">
      <div className="create-post-card">
        
        <h2 className="create-title">Create New Post</h2>
        <p className="create-subtitle">Share your thoughts, stories, or ideas</p>
        
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="create-form">
          
          {/* TITLE */}
          <label>Post Title</label>
          <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          required
          />
          
          {/* BODY */}
          <label>Content</label>
          <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your story here..."
          rows={12}
          required
          />
          
          {/* IMAGE UPLOAD */}
          {user?.role === 'admin' && (
            <div className="upload-box">
              <label>Cover Image (Admin only)</label>
              <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              />
            
            </div>
          )}
          
          {/* BUTTON */}
          <button type="submit" className="publish-btn">
            Publish Post
          </button>
        </form>
      </div>
      
    </div>
  );
};
export default CreatePostPage;