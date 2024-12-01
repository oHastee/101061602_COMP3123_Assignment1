import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const UpdateEmployee = () => {
    const { id } = useParams(); // Get the employee ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/emp/employees/${id}`); // Use eid from URL
                setFormData(response.data);
            } catch (err) {
                console.error('Failed to fetch employee details:', err.response || err.message);
                alert('Failed to fetch employee details.');
                navigate('/employees');
            }
        };

        fetchEmployee();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/emp/employees/${id}`, formData); // Update employee using eid
            alert('Employee updated successfully!');
            navigate('/employees');
        } catch (err) {
            console.error('Failed to update employee:', err.response || err.message);
            alert('Failed to update employee. Please try again.');
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
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
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
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Joining:</label>
                    <input
                        type="date"
                        name="date_of_joining"
                        value={formData.date_of_joining}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => navigate('/employees')}
                    style={{ marginLeft: '10px' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
