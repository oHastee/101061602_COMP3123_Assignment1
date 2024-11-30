import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_BASE_URL // Render Server
        : process.env.REACT_APP_API_LOCAL, // Use the local backend for development
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;