import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/emp/employees');
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Employees List</h2>
            <button onClick={() => navigate('/employees/add')}>Add Employee</button>
            <button onClick={() => navigate('/logout')}>Logout</button>
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
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button onClick={() => navigate(`/employees/view/${employee._id}`)}>View</button>
                            <button onClick={() => navigate(`/employees/edit/${employee._id}`)}>Edit</button>
                            <button onClick={() => navigate(`/employees/delete/${employee._id}`)} style={{ color: 'red' }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
