import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_BASE_URL // Render Server
        : process.env.REACT_APP_API_LOCAL, // Use the local backend for development
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('Current NODE_ENV:', process.env.NODE_ENV);
console.log('Base URL:', process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_LOCAL);

export default api;