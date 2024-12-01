import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Box,
} from '@mui/material';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [originalEmployees, setOriginalEmployees] = useState([]); // Store the original list
    const [searchCriteria, setSearchCriteria] = useState({ name: '', position: '', department: '' });
    const navigate = useNavigate();

    // Fetch all employees on initial load
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/emp/employees');
            setEmployees(data);
            setOriginalEmployees(data); // Save the full list
        } catch (err) {
            console.error('Failed to fetch employees:', err.response || err.message);
        }
    };

    const handleSearch = async () => {
        const { name, position, department } = searchCriteria;

        if (!name.trim() && !position.trim() && !department.trim()) {
            alert('Please enter at least one search criterion.');
            return;
        }

        try {
            const searchParams = new URLSearchParams();
            if (name.trim()) searchParams.append('name', name.trim());
            if (position.trim()) searchParams.append('position', position.trim());
            if (department.trim()) searchParams.append('department', department.trim());

            const { data } = await api.get(`/emp/employees/search?${searchParams.toString()}`);

            if (name.trim() && !data.some((emp) => emp.first_name === name || emp.last_name === name)) {
                alert('No employees matched your search criteria.');
                setEmployees(originalEmployees);
                return;
            }

            if (position.trim() && !data.some((emp) => emp.position.toLowerCase() === position.toLowerCase())) {
                alert('Position does not exist.');
                setEmployees(originalEmployees);
                return;
            }

            if (department.trim() && !data.some((emp) => emp.department.toLowerCase() === department.toLowerCase())) {
                alert('Department does not exist.');
                setEmployees(originalEmployees);
                return;
            }

            setEmployees(data);
        } catch (err) {
            console.error('Failed to search employees:', err.response || err.message);
            alert('Failed to search employees. Please try again.');
        }
    };

    const handleAddEmployee = () => {
        navigate('/employees/add');
    };

    const handleViewEmployee = (id) => {
        if (!id) {
            alert('Employee ID is undefined.');
            return;
        }
        navigate(`/employees/view/${id}`);
    };

    const handleUpdateEmployee = (id) => {
        if (!id) {
            alert('Employee ID is undefined.');
            return;
        }
        navigate(`/employees/edit/${id}`);
    };

    const handleDeleteEmployee = async (id) => {
        if (!id) {
            alert('Employee ID is undefined.');
            return;
        }

        try {
            await api.delete(`/emp/employees?eid=${id}`);
            alert('Employee deleted successfully!');
            setEmployees(employees.filter((emp) => emp.employee_id !== id));
        } catch (err) {
            console.error('Failed to delete employee:', err.response || err.message);
            alert('Unable to delete employee. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prev) => ({ ...prev, [name]: value }));
    };

    const handleResetSearch = () => {
        setSearchCriteria({ name: '', position: '', department: '' });
        setEmployees(originalEmployees);
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
                        Employee Management
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Search Section */}
            <Box sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Employees List
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={searchCriteria.name}
                        onChange={handleInputChange}
                        InputProps={{
                            sx: { borderRadius: '8px' },
                        }}
                    />
                    <TextField
                        label="Position"
                        variant="outlined"
                        name="position"
                        value={searchCriteria.position}
                        onChange={handleInputChange}
                        InputProps={{
                            sx: { borderRadius: '8px' },
                        }}
                    />
                    <TextField
                        label="Department"
                        variant="outlined"
                        name="department"
                        value={searchCriteria.department}
                        onChange={handleInputChange}
                        InputProps={{
                            sx: { borderRadius: '8px' },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ borderRadius: '8px' }}
                    >
                        Search
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleResetSearch}
                        sx={{ borderRadius: '8px' }}
                    >
                        Back to Full List
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddEmployee}
                        sx={{ borderRadius: '8px' }}
                    >
                        Add Employee
                    </Button>
                </Box>

                {/* Employee Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No employees to display.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                employees.map((employee) => (
                                    <TableRow key={employee.employee_id}>
                                        <TableCell>{employee.first_name}</TableCell>
                                        <TableCell>{employee.last_name}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.position}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleViewEmployee(employee.employee_id)}
                                                sx={{ borderRadius: '6px' }}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleUpdateEmployee(employee.employee_id)}
                                                sx={{ marginLeft: 1, borderRadius: '6px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDeleteEmployee(employee.employee_id)}
                                                sx={{ marginLeft: 1, borderRadius: '6px' }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default EmployeeList;
