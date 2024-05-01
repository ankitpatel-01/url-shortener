const express = require('express');
const multer = require('multer');
const router = express.Router();

const { uploadImg } = require('../controllers/uploadImg');

// Multer storage configuration (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
    '/',
    upload.single('file'),
    uploadImg
)

module.exports = router