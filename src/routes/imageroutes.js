const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const { uploadImageHandler } = require('../controllers/imageController');

router.post('/upload', upload.single('image'), uploadImageHandler);
module.exports = router;
