const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // Adjust path if necessary
const mongoose = require('mongoose');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        // Map employees to match the sample output
        const employeeList = employees.map(emp => ({
            employee_id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department,
        }));

        res.status(200).json(employeeList);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        } = req.body;

        // Check if employee with the same email exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({ message: 'Employee already exists.' });
        }

        // Create new employee
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });

        // Save to database
        await newEmployee.save();

        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: newEmployee._id,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


exports.getEmployeeById = async (req, res) => {
    try {
        const { eid } = req.params;

        // Validate that eid is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        const employee = await Employee.findById(eid);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const employeeData = {
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department,
        };

        res.status(200).json(employeeData);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


exports.updateEmployee = async (req, res) => {
    try {
        const eid = req.params.eid;
        const updates = req.body;

        const employee = await Employee.findByIdAndUpdate(eid, updates, {
            new: true,
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({
            message: 'Employee details updated successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const eid = req.query.eid;

        const employee = await Employee.findByIdAndDelete(eid);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({
            message: 'Employee deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
        const { name, department, position } = req.query;

        // Build a filter object
        const filter = {};
        if (name) {
            filter.$or = [
                { first_name: name },
                { last_name: name },
            ];
        }
        if (department) {
            filter.department = department;
        }
        if (position) {
            filter.position = position;
        }

        const employees = await Employee.find(filter);

        // Return all employees if no results match
        res.status(200).json(employees);
    } catch (err) {
        console.error('Error searching employees:', err);
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
};
