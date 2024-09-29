
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card'; // Importing Card component for better layout
import { signin } from '../services/authService'; // Import the signin function from your service
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './pages.css'; // Ensure to import your styles here

const SignInPage = () => {
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

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error

        try {
            const data = await signin(email, password); // Call the signin service
            // Save the token or any necessary data (e.g., user ID) in local storage
            localStorage.setItem('token', data.token);
            console.log('Sign-in successful:', data);
            // Redirect or update state as needed
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign-in.');
            console.error("Sign-in error:", err);
        }
    };

    return (
        <div className="signin-page p-4 flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card title="Sign In" style={{ width: '400px' }}>
                <form onSubmit={handleSignIn} className="flex flex-column">
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
                        label="Sign In" 
                        icon="pi pi-sign-in" 
                        type="submit" 
                        className="mt-2" 
                        style={{ width: '100%' }} // Make button full width
                    />
                </form>
            </Card>
        </div>
    );
};

export default SignInPage;
