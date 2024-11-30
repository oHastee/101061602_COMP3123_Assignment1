const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');


// Signup Route
router.post('/signup', userController.signup);

// Login Route
router.post('/login', [
    // Validate that either email or username is provided
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('username').optional().isString().withMessage('Username must be a string'),
    check('password').exists().withMessage('Password is required')
], userController.login);

module.exports = router;
