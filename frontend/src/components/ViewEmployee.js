import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const ViewEmployee = () => {
    const { id } = useParams(); // Extract the :id from the URL
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/emp/employees/${id}`); // Use employee_id
                setEmployee(response.data);
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

    if (!employee) {
        return <div>Loading...</div>; // Loading state while fetching data
    }

    return (
        <div>
            <h2>Employee Details</h2>
            <p><strong>First Name:</strong> {employee.first_name}</p>
            <p><strong>Last Name:</strong> {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <button onClick={() => navigate('/employees')}>Go Back</button>
        </div>
    );
};

export default ViewEmployee;
