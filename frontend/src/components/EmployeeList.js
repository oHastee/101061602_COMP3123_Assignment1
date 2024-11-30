import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/emp/employees');
                setEmployees(response.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch employees.');
            }
        };
        fetchEmployees();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await api.get(`/emp/employees/search?query=${searchTerm}`);
            setEmployees(response.data);
        } catch (err) {
            console.error(err);
            alert('Search failed.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/emp/employees/${id}`);
            setEmployees(employees.filter((emp) => emp._id !== id));
            alert('Employee deleted successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to delete employee.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h2>Employees List</h2>
            <button onClick={() => navigate('/employees/add')}>Add Employee</button>
            <button onClick={handleLogout} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                Logout
            </button>
            <div style={{ margin: '20px 0' }}>
                <input
                    type="text"
                    placeholder="Search by name, department, or position"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee._id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <Link to={`/employees/view/${employee._id}`}>View</Link>
                            <Link to={`/employees/edit/${employee._id}`} style={{ marginLeft: '10px' }}>
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(employee._id)}
                                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
