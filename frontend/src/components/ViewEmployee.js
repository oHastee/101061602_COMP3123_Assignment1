import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const ViewEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/emp/employees/${id}`);
                setEmployee(response.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch employee details.');
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div>
            <h2>View Employee Details</h2>
            <p>
                <strong>First Name:</strong> {employee.firstName}
            </p>
            <p>
                <strong>Last Name:</strong> {employee.lastName}
            </p>
            <p>
                <strong>Email:</strong> {employee.email}
            </p>
            <button onClick={() => navigate('/employees')}>Back to Employee List</button>
        </div>
    );
};

export default ViewEmployee;
