const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Signup Route with Validation
router.post(
    '/signup',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    userController.signup
);

// Login Route
router.post('/login', [
    // Validate that either email or username is provided
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('username').optional().isString().withMessage('Username must be a string'),
    check('password').exists().withMessage('Password is required')
], userController.login);

module.exports = router;
