// frontend/src/pages/HomePage.js

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>🌅 Welcome to Serenity</h1>
          <p>
            Sunsets symbolize transitions, endings, and new beginnings.
            They remind us to pause, reflect, and appreciate life’s beauty.
          </p>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="info-section">
        <h2>The Peace of the Sunset</h2>
        <p>
          In a world that is always moving, the sunset is my favorite time to stop
          and relax for a moment. It offers reflection, mindfulness, and emotional peace.
        </p>

        <h3>What I Enjoy Most:</h3>

        <ul>
          <li>The quiet feeling of the evening air.</li>
          <li>The beautiful colors lighting the sky.</li>
          <li>The peaceful feeling of knowing the day is done.</li>
        </ul>
      </section>

      {/* CARDS SECTION */}
      <section className="feature-cards">

        <div className="feature-card">
          <h3>My Passion</h3>
          <p>Learn more about why I love sunsets and peaceful evenings.</p>
          <Link to="/about">Learn More</Link>
        </div>

        <div className="feature-card">
          <h3>Join Community</h3>
          <p>Sign up and receive peaceful reminders every day.</p>
          <Link to="/register">Sign Up</Link>
        </div>

        <div className="feature-card">
          <h3>Play Game</h3>
          <p>Enjoy the relaxing sunset-themed quiz game.</p>
          <Link to="/game">Play Now</Link>
        </div>

      </section>

      {/* POSTS SECTION */}
      <section className="latest-posts">
        <h2 className="page-title">Latest Posts</h2>

        <div className="posts-grid">
          {posts.map(post => (
            <div className="post-card" key={post._id}>
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                />
              )}

              <h3>
                <Link to={`/posts/${post._id}`}>
                  {post.title}
                </Link>
              </h3>

              <p>{post.body.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </section>
      
      <footer className="footer">
        Contact: angmmd@gmail.com | © 2026 Thea's Portfolio - All Rights Reserved.
      </footer>

    </div>
  );
};

export default HomePage;