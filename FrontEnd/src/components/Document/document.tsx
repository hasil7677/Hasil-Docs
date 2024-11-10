import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById, updateDocument } from '../../services/docsService';
import { Editor } from '../Editor/Editor'; // Assuming Editor is your Tiptap editor component
import { Button } from 'primereact/button';
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from '../Toolbar/toolbar'; // Import the Toolbar component
import './MainPage.css'; // Import your CSS file

const MainPage = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editor, setEditor] = useState<any>(null); // Hold reference to the editor instance

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

    // Function to handle content changes in the editor
    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return (
        <div className="main-container">
            <h1>Document Editor</h1>
            <h2>{title || 'Untitled Document'}</h2>

            <Button label="Update Document" onClick={handleUpdateDocument} />


            <div className="editor-container">
                {/* Your Tiptap editor component */}
                {/* <Toolbar editor={editor} /> */}
            
                <Editor 
                    content={content} 
                    setContent={handleContentChange} 
                    setEditor={setEditor} // Pass the editor instance back to MainPage
                />
                
            </div>
        </div>
    );
};

export default MainPage;
