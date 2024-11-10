import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllDocsByUserId } from '../services/docsService';
import { useNavigate } from 'react-router-dom';

interface Document {
  _id: any;
  id: string;
  title: string;
}

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem('user');

        // Check if userData exists and parse it
        if (userData) {
          const user = JSON.parse(userData);

          // Make sure the user object has the id property
          if (user && user.id) {
            const userId = user.id;
            console.log("User ID:", userId);

            // Fetch documents using the user ID
            const docs = await getAllDocsByUserId(userId);
            console.log("Fetched documents:", docs);
            setDocuments(docs.all_docs)
          } else {
            console.log("User ID not found in the stored user data.");
          }
        } else {
          console.log("No user data found in localStorage.");
        }
      } catch (error) {
        console.error("Error in fetching documents:", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="container">
      <h1>All Documents</h1>
      <div className="document-grid">
        {documents.map((doc) => (
          <div key={doc._id} className="document-box">
            <h3>{doc.title}</h3>
            <button onClick={() => navigate(`/document/${doc._id}`)}>View Document</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;
