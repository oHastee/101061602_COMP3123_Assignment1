const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password, // Password will be hashed by the schema pre-save hook
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({
            message: 'User created successfully.',
            user_id: newUser._id,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.login = async (req, res) => {
    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, username, password } = req.body;
        const loginField = email || username;

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: loginField }, { username: loginField }],
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({
            message: 'Login successful.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


