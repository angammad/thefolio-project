// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

/* connect database */
connectDB();

/* REQUIRED middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* static uploads */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* cors */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://thefolio-project-18vc.vercel.app',
    'https://thefolio-project-git-main-an-gmmd.vercel.app',
  ],
  credentials: true,
}));



/* test route */
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

/* routes */
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});