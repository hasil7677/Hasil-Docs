const Doc = require('../models/doc');

// Create new document
const createDoc = async (req, res) => {
  try {
    const { title, content } = req.body; // Destructure title and content from request body
    const userID = req.user.id; // Extract user ID from the authenticated request

    // Create a new document instance
    const newDoc = new Doc({
      user: userID,
      title,
      content
    });

    await newDoc.save(); // Save the new document to the database

    // Return the full document details in the response
    res.status(201).json({
      message: 'Document created successfully',
      doc: {
        id: newDoc._id, // Document ID
        title: newDoc.title, // Title
        content: newDoc.content, // Content
        user: newDoc.user, // User ID
        createdAt: newDoc.createdAt, // Creation date
        updatedAt: newDoc.updatedAt // Last updated date
      }
    });
  } catch (error) {
    console.error('Document creation error:', error);
    res.status(500).json({ error: 'Failed to create document' });
  }
};

// Get a document by ID
const getDocById = async (req, res) => {
  try {
    const { id } = req.params; // Get document ID from request params
    const doc = await Doc.findById(id); // Find document by ID in the database

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ doc });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
};

// Update a document by ID
const updateDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body; // Extract updated title and content from request body

    const updatedDoc = await Doc.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated document
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ message: 'Document updated successfully', doc: updatedDoc });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Failed to update document' });
  }
};

module.exports = { createDoc, getDocById, updateDoc };