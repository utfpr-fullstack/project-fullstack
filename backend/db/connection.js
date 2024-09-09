require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            maxPoolSize: 10, 
            serverSelectionTimeoutMS: 5000 
        });
        console.log('Database connected');
    } catch (err) {
        console.log('Database connection error:', err);
    }
}

connect();

module.exports = mongoose;
