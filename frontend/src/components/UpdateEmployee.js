import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/emp/employees/${id}`);
                setFormData(response.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch employee details.');
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/emp/employees/${id}`, formData);
            alert('Employee updated successfully!');
            navigate('/employees');
        } catch (err) {
            console.error(err);
            alert('Failed to update employee.');
        }
    };

    return (
        <div>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/employees')} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
