import axios from 'axios';

const API_URL = 'http://localhost:5000/api/docs/create';

export const createDocument = async (title: string) => {
    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const response = await axios.post(API_URL, { title, content: '' }, { // Set content as an empty string
            headers: {
                'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                'Content-Type': 'application/json' // Set content type to JSON
            }
        });
        localStorage.setItem("doc",JSON.stringify(response.data.doc))
        return response.data; // Return the created document data
    } catch (error: any) { // Type the error as 'any'
        console.error("Error creating document:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it in the component
    }
};
