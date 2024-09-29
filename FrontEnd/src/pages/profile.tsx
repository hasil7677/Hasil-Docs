// src/components/ProfilePage.tsx

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
// import './ProfilePage.css'; // Import your CSS file
import './pages.css';
const ProfilePage: React.FC = () => {
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        profilePicture: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    });

    const handleEdit = () => {
        // Handle edit logic here
        alert('Edit button clicked');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <Avatar image={user.profilePicture} shape="circle" size="large" />
                <div className="profile-info">
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
            <Button label="Edit" icon="pi pi-pencil" className="edit-button" onClick={handleEdit} />
        </div>
    );
};

export default ProfilePage;
