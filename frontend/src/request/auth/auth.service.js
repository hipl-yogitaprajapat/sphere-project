import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

// services/auth.js
export const signup = async (registerInfo) => {
    const response = await axios.post(`${API_BASE_URL}auth/signup`, registerInfo, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;
};

export const login = async (loginInfo) => {
    const response = await axios.post(`${API_BASE_URL}auth/login`, loginInfo, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;
};


export const logout = async () => {
    const response = await axios.post(`${API_BASE_URL}auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
             "Authorization": `Bearer${localStorage.getItem("token")}`
        },
        withCredentials: true
    });
    return response.data;
};

export const forgetpassword = async (email) => {
    const response = await axios.post(`${API_BASE_URL}auth/forget-password`, email, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });    
    return response.data;
};

export const resetpassword = async ({ input, id, token }) => {
    const response = await axios.post(`${API_BASE_URL}auth/reset-password/${id}/${token}`,input, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });    
    return response.data;
};

export const googlelogin = async(code) => {  
    const response = await axios.get(`${API_BASE_URL}auth/google?code=${code}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });    
    return response.data;    
};


export const updateprofile = async (formData) => {
    const response = await axios.put(`${API_BASE_URL}auth/update-profile`, formData, {
        withCredentials: true,
    });
    return response.data;
    
};

export const viewprofile = async () => {
    const response = await axios.get(`${API_BASE_URL}auth/view-profile`, {
        withCredentials: true,
    });
    return response.data;    
};
