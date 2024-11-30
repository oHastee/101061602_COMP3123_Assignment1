import React, { useEffect, useState } from 'react';
import api from '../api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/employees');
                setEmployees(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee._id}>{employee.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeList;
