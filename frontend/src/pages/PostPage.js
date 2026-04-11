// frontend/src/pages/PostPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          API.get(`/posts/${id}`),
          API.get(`/comments/${id}`),
        ]);

        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError('Post not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isOwner = user && post?.author && user._id === post.author._id;
  const isAdmin = user && user.role === 'admin';

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    try {
      const { data } = await API.post(`/comments/${id}`, {
        body: commentBody,
      });

      setComments([data, ...comments]);
      setCommentBody('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await API.delete(`/posts/${id}`);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post');
    }
  };

  if (loading)
    return <div className="post-loading">Loading post...</div>;

  if (error)
    return <div className="post-error">{error}</div>;

  if (!post)
    return <div className="post-error">Post not found.</div>;

  return (
    <div className="post-page-container">

      {/* POST CARD */}
      <div className="post-card">

        {post.image && (
          <div className="post-image-wrapper">
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt={post.title}
              className="post-image"
            />
          </div>
        )}

        <div className="post-content">

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span>By <strong>{post.author?.name}</strong></span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          {(isOwner || isAdmin) && (
            <div className="post-actions">
              <Link to={`/edit-post/${post._id}`} className="btn-edit">
                Edit
              </Link>
              <button onClick={handleDeletePost} className="btn-danger">
                Delete
              </button>
            </div>
          )}

          <div className="post-body">
            {post.body.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="comments-card">

        <h3 className="comments-title">
          Comments ({comments.length})
        </h3>

        {/* COMMENT FORM */}
        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              rows={3}
            />
            <button type="submit" className="btn-primary">
              Post Comment
            </button>
          </form>
        ) : (
          <p className="login-msg">
            <Link to="/login">Login</Link> to leave a comment.
          </p>
        )}

        {/* COMMENT LIST */}
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">

              <div className="comment-header">
                <div>
                  <strong>{comment.author?.name}</strong>
                  <small>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>

                {(user &&
                  (comment.author?._id === user._id || isAdmin)) && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="btn-sm-danger"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="comment-body">{comment.body}</p>
            </div>
          ))}
        </div>

      </div>
      
      <footer className="footer">
        Contact: angmmd@gmail.com | © 2026 Thea's Portfolio - All Rights Reserved.
      </footer>
      
    </div>
  );
};

export default PostPage;