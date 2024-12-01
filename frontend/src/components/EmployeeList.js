import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await api.get('/emp/employees');
                console.log('Fetched employees:', data); // Debugging
                setEmployees(data);
            } catch (err) {
                console.error('Failed to fetch employees:', err.response || err.message);
            }
        };

        fetchEmployees();
    }, []);

    const handleAddEmployee = () => {
        navigate('/employees/add');
    };

    const handleViewEmployee = (id) => {
        if (!id) {
            console.error('Employee ID is undefined.');
            alert('Failed to retrieve employee details. Please try again.');
            return;
        }
        navigate(`/employees/view/${id}`);
    };

    const handleUpdateEmployee = (id) => {
        if (!id) {
            console.error('Employee ID is undefined.');
            alert('Failed to retrieve employee details. Please try again.');
            return;
        }
        navigate(`/employees/edit/${id}`);
    };

    const handleDeleteEmployee = async (id) => {
        if (!id) {
            console.error('Employee ID is undefined.');
            alert('Failed to delete employee. Please try again.');
            return;
        }

        try {
            await api.delete(`/emp/employees?eid=${id}`); // Use query parameter
            alert('Employee deleted successfully!');
            setEmployees(employees.filter((emp) => emp.employee_id !== id));
        } catch (err) {
            console.error('Failed to delete employee:', err.response || err.message);
            alert('Unable to delete employee. Please try again.');
        }
    };

    if (employees.length === 0) {
        return <div>No employees to display.</div>;
    }

    return (
        <div>
            <h2>Employees List</h2>
            <button onClick={handleAddEmployee}>Add Employee</button>
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
                    <tr key={employee.employee_id}>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button onClick={() => handleViewEmployee(employee.employee_id)}>View</button>
                            {' | '}
                            <button onClick={() => handleUpdateEmployee(employee.employee_id)}>Edit</button>
                            {' | '}
                            <button onClick={() => handleDeleteEmployee(employee.employee_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
