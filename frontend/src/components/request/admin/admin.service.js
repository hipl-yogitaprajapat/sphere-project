
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

// services/admin.js
export const addadminuser = async (clientInfo) => {
    const response = await axios.post(`${API_BASE_URL}admin/addusersform`, clientInfo, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;
    
};


export const addnewproject = async (newProject) => {
    const response = await axios.post(`${API_BASE_URL}admin/create-project`, newProject, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;    
};


export const viewprojects = async () => {
    const response = await axios.get(`${API_BASE_URL}admin/view-projects`, {
        withCredentials: true,
    });
    return response.data; 
};