const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Make sure MongoDB is running on your machine');
});

// Routes
const routes = require('./routes/index');
app.use('/api', routes);
console.log('Routes loaded successfully');

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});