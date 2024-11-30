import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/emp/employees', formData);
            alert('Employee added successfully!');
            navigate('/employees');
        } catch (err) {
            console.error(err);
            alert('Failed to add employee.');
        }
    };

    return (
        <div>
            <h2>Add Employee</h2>
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

export default AddEmployee;
