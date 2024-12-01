require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

app.use(
    cors({
        origin: [
            process.env.FRONTEND_ORIGIN, // Your frontend URL from .env
            'http://localhost:3001', // For local testing
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        credentials: true,
    })
);

// Handle preflight requests
app.options('*', cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


// MongoDB Connection
const mongoURI = process.env.MONGODB_URI_REMOTE || process.env.MONGODB_URI_LOCAL;

if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please check your .env file.');
    process.exit(1); // Exit the application if URI is not defined
}

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB (${process.env.NODE_ENV})`))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit if MongoDB connection fails
    });

// Routes
try {
    app.use('/api/v1/user', require('./routes/userRoutes'));
    app.use('/api/v1/emp', require('./routes/employeeRoutes'));
} catch (err) {
    console.error('Error loading routes:', err.message);
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: 'Something went wrong!',
        error: err.message,
    });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
