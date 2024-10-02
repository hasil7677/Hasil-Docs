import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById, updateDocument } from '../../services/docsService';
import { Editor } from '../Editor/Editor';
import { Button } from 'primereact/button';
import './MainPage.css'; // Import your CSS file

const MainPage = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

    const handleUpdateDocument = async () => {
        if (!id) {
            alert('Document ID is not available.');
            return;
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

            <Button label="Update Document" onClick={handleUpdateDocument} />

            <div className="editor-container">
                {/* Your Tiptap editor component */}
                <Editor content={content} setContent={setContent} />
            </div>
        </div>
    );
};

export default MainPage;

