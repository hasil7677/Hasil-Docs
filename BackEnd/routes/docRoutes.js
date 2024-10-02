const express = require('express');
const { createDoc, getDocById, updateDoc, deleteDocById } = require('../controllers/docController');
const authenticate = require('../middleware/authenticate'); // Middleware to verify JWT

const router = express.Router();

// Route to create a document (protected route)
router.post('/create', authenticate, createDoc);
router.get('/get/:id', authenticate, getDocById);
router.put('/update/:id',authenticate,updateDoc)
router.delete('/delete:id',authenticate, deleteDocById)

module.exports = router;
