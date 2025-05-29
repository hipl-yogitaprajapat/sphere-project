
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const addnewtask = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}task/create-task`, formData, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;    
};