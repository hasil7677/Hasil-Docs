import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import './pages.css';
import { createDocument } from '../services/docsService';
import Navbar from '../components/Navbar/navbar';

const HomePage = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null); // Error state for handling API errors

    const handleOpenDialog = () => {
        setVisible(true);
    };

    const handleCreate = async () => {
        try {
            const createdDoc = await createDocument(title);
            console.log("Document created:", createdDoc);
            setVisible(false);
            setTitle('');
            setError(null); // Reset any previous error
        } catch (err: any) {
            setError('Failed to create document. Please try again.'); // Set error state
            console.error("Error creating document:", err);
        }
    };

    const handleHide = () => {
        setVisible(false);
        setTitle('');
        setError(null); // Reset error state
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreate();
        }
    };

    return (
  
        <div className="homepage p-4 flex flex-column align-items-center">
            <h1 className="mb-4">Start a New Document</h1>
            <Button 
                label="Blank Document" 
                icon="pi pi-plus" 
                className="p-button-outlined p-button-lg" 
                style={{ borderRadius: '8px', minWidth: '150px', height: '150px', fontSize: '24px' }} 
                onClick={handleOpenDialog} 
            />
            
            {/* Dialog for creating a new document */}
            <Dialog 
                header="New Document" 
                visible={visible} 
                onHide={handleHide}
                style={{ width: '400px' }} 
            >
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
                <div className="flex justify-content-end">
                    <Button 
                        label="Create" 
                        icon="pi pi-check" 
                        onClick={handleCreate} 
                        className="mr-2" 
                    />
                    <Button 
                        label="Cancel" 
                        icon="pi pi-times" 
                        onClick={handleHide} 
                        className="p-button-secondary" 
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default HomePage;