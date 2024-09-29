const express = require('express');
const { createDoc } = require('../controllers/docController');
const authenticate = require('../middleware/authenticate'); // Middleware to verify JWT

const router = express.Router();

// Route to create a document (protected route)
router.post('/create', authenticate, createDoc);

module.exports = router;
