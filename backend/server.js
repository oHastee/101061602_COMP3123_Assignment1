require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Determine MongoDB URI based on environment
const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI_REMOTE
        : process.env.MONGODB_URI_LOCAL;

mongoose
    .connect(mongoURI) // Use the mongoURI constant here
    .then(() => console.log(`Connected to MongoDB (${process.env.NODE_ENV})`))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/emp', require('./routes/employeeRoutes'));

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
