
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const addnewtask = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}task/create-task`, formData, {
        withCredentials: true
    });
    return response.data;    
};

export const viewuserbyrole = async (designation) => {
    const response = await axios.get(`${API_BASE_URL}role/?role=${designation}`, {
        withCredentials: true,
    });
    return response.data; 
};


export const viewtask = async () => {
    const response = await axios.get(`${API_BASE_URL}task/tasks`, {
        withCredentials: true,
    });
    return response.data; 
};

export const updatetask = async ({id,formData}) => { 
    const response = await axios.put(`${API_BASE_URL}task/update/${id}`,formData, {
        withCredentials: true,
    });
    return response.data; 
};

export const deletetask = async ({id}) => { 
    const response = await axios.delete(`${API_BASE_URL}task/delete-task/${id}`, {
        withCredentials: true,
    });
    return response.data;    
};
