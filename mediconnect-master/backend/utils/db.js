const mongoose = require('mongoose');

function connectDB(url) {
    return mongoose.connect(url, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    });
}

module.exports = connectDB;