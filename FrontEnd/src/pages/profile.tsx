// src/components/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
// import './ProfilePage.css'; // Import your CSS file
import './pages.css';
import { formToJSON } from 'axios';
const ProfilePage: React.FC = () => {
     
    const [user, setUser] = useState({
       
        name: '',
        email: '',
        profilePicture: '',
    });
    useEffect(() => {
        const temp = localStorage.getItem('user');
        const data=JSON.parse(temp);
        console.log(data)


    }, []);

    const handleEdit = () => {
        // Handle edit logic here
        alert('Edit button clicked');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <Avatar image={user.profilePicture} shape="circle" size="large" />
                <div className="profile-info">
                    <h2> {user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
            <Button label="Edit" icon="pi pi-pencil" className="edit-button" onClick={handleEdit} />
        </div>
    );
};

export default ProfilePage;
