import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ department: '', position: '' });
    const navigate = useNavigate();

    // Fetch all employees on initial load
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/emp/employees');
            setEmployees(data);
        } catch (err) {
            console.error('Failed to fetch employees:', err.response || err.message);
        }
    };

    const handleSearch = async () => {
        try {
            const { department, position } = searchCriteria;
            const searchParams = new URLSearchParams();

            if (department) searchParams.append('department', department);
            if (position) searchParams.append('position', position);

            const { data } = await api.get(`/emp/employees/search?${searchParams.toString()}`);
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

    return (
        <div>
            <h2>Employees List</h2>
            <button onClick={handleAddEmployee}>Add Employee</button>

            {/* Search Bar */}
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={searchCriteria.department}
                        onChange={handleInputChange}
                        placeholder="Enter department"
                        style={{ marginLeft: '10px', marginRight: '20px' }}
                    />
                </label>
                <label>
                    Position:
                    <input
                        type="text"
                        name="position"
                        value={searchCriteria.position}
                        onChange={handleInputChange}
                        placeholder="Enter position"
                        style={{ marginLeft: '10px', marginRight: '20px' }}
                    />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                            No employees to display.
                        </td>
                    </tr>
                ) : (
                    employees.map((employee) => (
                        <tr key={employee.employee_id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button onClick={() => handleViewEmployee(employee.employee_id)}>View</button>
                                {' | '}
                                <button onClick={() => handleUpdateEmployee(employee.employee_id)}>Edit</button>
                                {' | '}
                                <button onClick={() => handleDeleteEmployee(employee.employee_id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
