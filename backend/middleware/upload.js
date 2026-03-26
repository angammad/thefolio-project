// backend/middleware/upload.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ok = /jpeg|jpg|png|gif|webp/;
  
  if (ok.test(path.extname(file.originalname).toLowerCase()) && ok.test(file.mimetype))
  return cb(null, true);
  cb(new Error('Images only (jpg, png, gif, webp)'));
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

