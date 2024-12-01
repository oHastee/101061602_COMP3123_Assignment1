import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
} from '@mui/material';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/user/signup', formData);
            alert('Signup successful! Please login.');
            navigate('/');
        } catch (err) {
            console.error('Error:', err.response || err.message);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                        Signup
                    </Typography>
                    <TextField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    {error && (
                        <Typography color="error" sx={{ marginBottom: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '4px' }}>
                            Signup
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/')}
                            sx={{ borderRadius: '4px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};

export default Signup;
