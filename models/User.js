// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Define schema fields here
});

module.exports = mongoose.model('User', UserSchema);
