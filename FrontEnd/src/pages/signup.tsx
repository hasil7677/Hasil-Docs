import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card'; // Importing Card component for better layout
import { signup } from '../services/authService'; // Import the service
import './pages.css'; // Ensure to import your styles here
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Error state
    const navigate = useNavigate(); // Initialize useNavigate

    // Redirect if token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to home page
        }
    }, [navigate]);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error
    
        // Combine first and last name
        const name = `${firstName} ${lastName}`;
    
        try {
            const data = await signup(name, email, password); // Pass combined name to the service
            console.log('Sign-up successful:', data);
            // Redirect or update state as needed
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign-up.');
            console.error("Sign-up error:", err);
        }
    };
    

    return (
        
        <div className="signup-page p-4 flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card title="Sign Up" style={{ width: '400px' }}>
                <form onSubmit={handleSignUp} className="flex flex-column">
                    <div className="field mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <InputText 
                            id="firstName" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            required 
                            placeholder="Enter your first name" 
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText 
                            id="lastName" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            required 
                            placeholder="Enter your last name" 
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="email">Email</label>
                        <InputText 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="password">Password</label>
                        <InputText 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter your password" 
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
                    <Button 
                        label="Sign Up" 
                        icon="pi pi-user-plus" 
                        type="submit" 
                        className="mt-2" 
                        style={{ width: '100%' }} // Make button full width
                    />
                </form>
            </Card>
        </div>
    );
};

export default SignUpPage;
