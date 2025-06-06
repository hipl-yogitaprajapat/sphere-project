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

export const updatecomment = async ({commentId,text}) => {
    const response = await axios.put(`${API_BASE_URL}comment/edit/${commentId}`,{text} ,{
        withCredentials: true,
    });
    return response.data; 
};


export const deletecomment = async ({commentId}) => {
    const response = await axios.delete(`${API_BASE_URL}comment/delete/${commentId}`,{
        withCredentials: true,
    });
    return response.data; 
};