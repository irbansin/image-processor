const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const { uploadImageHandler } = require('../controllers/imageController');

router.post('/upload', upload.array('images', 10), uploadImageHandler);
module.exports = router;
