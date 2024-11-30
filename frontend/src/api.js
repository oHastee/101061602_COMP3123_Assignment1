import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
