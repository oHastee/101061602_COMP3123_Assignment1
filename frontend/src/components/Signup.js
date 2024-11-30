import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Ensure this is correctly set up to point to your backend

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Debugging
        try {
            const response = await api.post('/user/signup', formData);
            console.log('Response:', response.data); // Debugging
            alert('Signup successful! Please login.');
            navigate('/');
        } catch (err) {
            console.error('Error:', err.response || err.message); // Debugging
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    style={{ marginLeft: '10px' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Signup;
