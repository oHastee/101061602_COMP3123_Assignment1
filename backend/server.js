require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS Setup
app.use(
    cors({
        origin: 'http://localhost:3001', // Your frontend origin
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        credentials: true, // Include cookies if needed
    })
);

// Handle preflight requests
app.options('*', cors());

// Optional additional headers for security and flexibility
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Matches the CORS origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Determine MongoDB URI based on environment
const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI_REMOTE
        : process.env.MONGODB_URI_LOCAL;

mongoose
    .connect(mongoURI) // Use the mongoURI constant here
    .then(() => console.log(`Connected to MongoDB (${process.env.NODE_ENV})`)) // Corrected string interpolation
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
try {
    app.use('/api/v1/user', require('./routes/userRoutes'));
    app.use('/api/v1/emp', require('./routes/employeeRoutes'));
} catch (err) {
    console.error('Error loading routes:', err);
}

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Corrected string interpolation
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: 'Something went wrong!',
        error: err.message,
    });
});
