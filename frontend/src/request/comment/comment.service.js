import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;


export const createnewcomment = async ({taskId,text}) => {
    const response = await axios.post(`${API_BASE_URL}comment/create`, {taskId,text}, {
        withCredentials: true
    });
    return response.data;    
};


export const addreplycomment = async ({taskId,text,parentId}) => {
    const response = await axios.post(`${API_BASE_URL}comment/create`, {taskId,text,parentId}, {
        withCredentials: true
    });
    return response.data;    
};

export const viewcomment = async ({id}) => {
    const response = await axios.get(`${API_BASE_URL}comment/${id}`, {
        withCredentials: true,
    });
    return response.data; 
    
};