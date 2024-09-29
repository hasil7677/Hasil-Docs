// Document.tsx
import React, { useState } from 'react';
import Editor from '../Editor/Editor'; // Import the Editor component

const Document: React.FC = () => {
  const [documentData, setDocumentData] = useState({
    title: 'Untitled Document',
    content: '<p>Start writing your document here...</p>' // Initial content
  });

  return (
    <div className="document">
      {/* Display the document title */}
      <h1>{documentData.title}</h1>

      {/* Render the Editor component, passing the document content */}
      <Editor content={documentData.content} />
    </div>
  );
};

export default Document;
