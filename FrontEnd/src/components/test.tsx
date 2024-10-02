import React, { useEffect, useState } from 'react';
import { getDocumentById, updateDocument } from '../services/docsService'; // Import your service functions
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

const TestDocument: React.FC = () => {
    
    const [docId, setDocId] = useState('');
    useEffect(() => {
        // Read from local storage when the component mounts
        const storedUsername = localStorage.getItem('username');
        const details=localStorage.getItem('doc')
        if (details) {
            // JSON.parse(details)
            const jsonObject = JSON.parse(details); // Convert string to JSON object
            console.log(jsonObject); // Output the JSON object
            setDocId(jsonObject.id)

            console.log(jsonObject.id);
        }
    }, []);
    const [document, setDocument] = useState<any>(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    // Fetch document when ID changes
    const fetchDocument = async () => {
        try {
            const doc = await getDocumentById(docId);
            setDocument(doc);
            setNewTitle(doc.title);
            setNewContent(doc.content);
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    // Update document
    const handleUpdateDocument = async () => {
        try {
            await updateDocument(docId, newTitle, newContent);
            alert('Document updated successfully!');
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <div>
            <h2>Test Document Functions</h2>
            <InputText
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                placeholder="Enter Document ID"
            />
            <Button label="Fetch Document" onClick={fetchDocument} />

            {document && (
                <Card title="Document Details">
                    <div>
                        <h3>Title</h3>
                        <InputText
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <h3>Content</h3>
                        <InputText
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <Button label="Update Document" onClick={handleUpdateDocument} />
                    </div>
                </Card>
            )}
        </div>
    );
};

export default TestDocument;
