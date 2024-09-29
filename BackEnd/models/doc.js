const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key referencing the User
  title: { type: String, required: true }, // Title of the document
  content: { type: String,  default: null }, // Content of the document
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the document was created
  updatedAt: { type: Date, default: Date.now } // Timestamp for when the document was last updated
});

module.exports = mongoose.model('Doc', docSchema);
