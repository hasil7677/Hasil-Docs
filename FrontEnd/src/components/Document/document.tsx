import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Make sure you have react-router-dom installed
import { getDocumentById, updateDocument } from '../../services/docsService'; // Import your services
import { Editor } from '../Editor/Editor'; // Your Tiptap editor component
import { Button } from 'primereact/button'; // PrimeReact button

const MainPage = () => {
    const { id } = useParams<{ id: string }>(); // Get the document ID from the URL
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Load the document when the component mounts or when the ID changes
    useEffect(() => {
        const loadDocument = async () => {
            if (id) {
                const document = await getDocumentById(id);
                setTitle(document.title);
                setContent(document.content);
            }
        };

        loadDocument();
    }, [id]);

    // Handle document update
    const handleUpdateDocument = async () => {
        if (!id) {
            alert('Document ID is not available.');
            return; // Exit the function if ID is not available
        }
    
        try {
            await updateDocument(id, title, content);
            alert('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
            alert('Failed to update document. Please try again.');
        }
    };
    
    return (
        <div>
            <h1>Document Editor</h1>
            <h2>{title || 'Untitled Document'}</h2>

            {/* Button to trigger the update */}
            <Button label="Update Document" onClick={handleUpdateDocument} />

            <div>
                {/* Your Tiptap editor component */}
                <Editor content={content} setContent={setContent} />
            </div>
        </div>
    );
};

export default MainPage;
