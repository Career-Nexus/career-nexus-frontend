const express = require('express');
const router = express.Router();
const { saveAboutStatement } = require('../controllers/userController');

// POST route to save "About Statement"
router.post('/about-statement', saveAboutStatement);

module.exports = router;
