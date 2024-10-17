const mongoose = require('mongoose');

// Use your connection string from .env or directly include it here
const connectionString = 'mongodb://localhost:27017/comp3123_assigment1';

mongoose.connect(connectionString)
    .then(() => {
        console.log('Successfully connected to MongoDB');

        // Query a specific collection (for example, the 'users' collection)
        mongoose.connection.db.collection('users').findOne({}, (err, result) => {
            if (err) {
                console.error('Error querying the users collection:', err);
            } else if (result) {
                console.log('Sample user from the users collection:', result);
            } else {
                console.log('No users found in the users collection.');
            }
            mongoose.connection.close(); // Close the connection
        });
    })
    .catch(err => {
        console.error('Connection failed:', err);
    });
