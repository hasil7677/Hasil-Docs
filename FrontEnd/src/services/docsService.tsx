import axios from 'axios';

const API_URL = 'http://localhost:5000/api/docs/';

export const createDocument = async (title: string) => {
    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const response = await axios.post(API_URL+'create', { title, content: '' }, { // Set content as an empty string
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
export const getDocumentById = async (id: string) => {
    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get(`${API_URL}get/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });
        return response.data.doc; // Return the document data
    } catch (error: any) { // Type the error as 'any'
        console.error("Error fetching document:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it in the component
    }
};
export const updateDocument = async (id: string, title: string, content: string) => {
    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.put(`${API_URL}update/${id}`, { title, content }, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });
        return response.data; // Return the updated document data
    } catch (error: any) { // Type the error as 'any'
        console.error("Error updating document:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const deleteDocument=async(id:string)=>{
    try{
        const token=localStorage.getItem('token');
        const response=await axios.delete(`${API_URL}delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });
        return response.data; // Return the response data
    } catch (error: any) { // Type the error as 'any'
        console.error("Error deleting document:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it in the component
    }
};
    
