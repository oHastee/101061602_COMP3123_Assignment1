
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// add routes here

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
