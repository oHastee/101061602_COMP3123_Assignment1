import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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

        // Check if all fields are empty
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

            // Check for exact matches
            if (name.trim() && !data.some((emp) => emp.first_name === name || emp.last_name === name)) {
                alert('No employees matched your search criteria.');
                setEmployees(originalEmployees); // Reset to full list
                return;
            }

            if (position.trim() && !data.some((emp) => emp.position.toLowerCase() === position.toLowerCase())) {
                alert('Position does not exist.');
                setEmployees(originalEmployees); // Reset to full list
                return;
            }

            if (department.trim() && !data.some((emp) => emp.department.toLowerCase() === department.toLowerCase())) {
                alert('Department does not exist.');
                setEmployees(originalEmployees); // Reset to full list
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
        setEmployees(originalEmployees); // Reset to full list
    };

    return (
        <div>
            <h2>Employees List</h2>
            <button onClick={handleAddEmployee}>Add Employee</button>

            {/* Search Bar */}
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={searchCriteria.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
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
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleResetSearch} style={{ marginLeft: '10px' }}>
                    Back to Full List
                </button>
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
