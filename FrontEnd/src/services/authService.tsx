import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update with your actual backend URL

export const signup = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { name, email, password });
        return response.data; // Returns the response from the backend
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Signup failed');
    }
};

export const signin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { email, password });
        return response.data; // Returns the token or any other data sent from the backend
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Signin failed');
    }
};
