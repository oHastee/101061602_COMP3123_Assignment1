import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Updated to match the backend server's port
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
