// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');

  useEffect(() => {
    API.get('/admin/users').then(r => setUsers(r.data));
    API.get('/admin/posts').then(r => setPosts(r.data));
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map(u => u._id === id ? data.user : u));
  };

  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={tab === 'users' ? 'active-tab' : ''}
          onClick={() => setTab('users')}
        >
          Members
        </button>

        <button
          className={tab === 'posts' ? 'active-tab' : ''}
          onClick={() => setTab('posts')}
        >
          Posts
        </button>
      </div>

      {/* USERS TABLE */}
      {tab === 'users' && (
        <div className="table-card">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.status}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-toggle"
                      onClick={() => toggleStatus(u._id)}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* POSTS TABLE */}
      {tab === 'posts' && (
        <div className="table-card">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {posts.map(p => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.author?.name}</td>
                  <td>
                    <span className={`badge ${p.status}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.status === 'published' && (
                      <button
                        className="btn-danger"
                        onClick={() => removePost(p._id)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <footer className="footer">
        Contact: angmmd@gmail.com | © 2026 Thea's Portfolio - All Rights Reserved.
      </footer>
      
    </div>
  );
};

export default AdminPage;