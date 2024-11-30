
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:Pass@cluster0.jjxa4.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority\n', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/v1/user', require('./routes/userRoutes'));


// Employee Routes
app.use('/api/v1/emp', require('./routes/employeeRoutes'));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
