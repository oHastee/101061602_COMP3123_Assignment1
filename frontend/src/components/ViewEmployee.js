import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Paper,
    Grid,
    Breadcrumbs,
    Link,
    CircularProgress,
} from '@mui/material';

const ViewEmployee = () => {
    const { id } = useParams(); // Extract the :id from the URL
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/emp/employees/${id}`); // Fetch employee details by ID
                setEmployee(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch employee details:', error.response || error.message);
                alert('Failed to fetch employee details.');
                navigate('/employees');
            }
        };

        if (id) {
            fetchEmployee(); // Fetch data if ID exists
        } else {
            console.error('Employee ID is missing.');
            alert('Invalid employee ID.');
            navigate('/employees');
        }
    }, [id, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (!employee) {
        return (
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <Typography color="error">Employee not found.</Typography>
            </Grid>
        );
    }

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
                            <Typography color="inherit">View Employee</Typography>
                        </Breadcrumbs>
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Employee Details */}
            <Grid container justifyContent="center" sx={{ paddingTop: 4 }}>
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
                    <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                        Employee Details
                    </Typography>
                    <Typography>
                        <strong>First Name:</strong> {employee.first_name}
                    </Typography>
                    <Typography>
                        <strong>Last Name:</strong> {employee.last_name}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {employee.email}
                    </Typography>
                    <Typography>
                        <strong>Position:</strong> {employee.position}
                    </Typography>
                    <Typography>
                        <strong>Salary:</strong> {employee.salary}
                    </Typography>
                    <Typography>
                        <strong>Date of Joining:</strong>{' '}
                        {new Date(employee.date_of_joining).toLocaleDateString()}
                    </Typography>
                    <Typography>
                        <strong>Department:</strong> {employee.department}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/employees')}
                            sx={{ borderRadius: '4px' }}
                        >
                            Go Back
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    );
};

export default ViewEmployee;
