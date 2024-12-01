import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    TextField,
    Paper,
    Grid,
    Breadcrumbs,
    Link,
} from '@mui/material';

const UpdateEmployee = () => {
    const { id } = useParams(); // Get the employee ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/emp/employees/${id}`);
                setFormData(response.data);
            } catch (err) {
                console.error('Failed to fetch employee details:', err.response || err.message);
                alert('Failed to fetch employee details.');
                navigate('/employees');
            }
        };

        fetchEmployee();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/emp/employees/${id}`, formData);
            alert('Employee updated successfully!');
            navigate('/employees');
        } catch (err) {
            console.error('Failed to update employee:', err.response || err.message);
            setError('Failed to update employee. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* AppBar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Breadcrumbs sx={{ color: '#fff' }}>
                            <Link
                                underline="hover"
                                color="inherit"
                                onClick={() => navigate('/employees')}
                                sx={{ cursor: 'pointer' }}
                            >
                                Employee Management
                            </Link>
                            <Typography color="inherit">Update Employee</Typography>
                        </Breadcrumbs>
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Update Employee Form */}
            <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                sx={{ height: 'calc(100vh - 64px)', paddingTop: 4 }}
            >
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                            Update Employee
                        </Typography>
                        <TextField
                            label="First Name"
                            name="first_name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            type="text"
                            value={formData.last_name}
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
                            label="Position"
                            name="position"
                            type="text"
                            value={formData.position}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Salary"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Date of Joining"
                            name="date_of_joining"
                            type="date"
                            value={formData.date_of_joining}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Department"
                            name="department"
                            type="text"
                            value={formData.department}
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
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/employees')}
                                sx={{ borderRadius: '4px' }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    );
};

export default UpdateEmployee;
