const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');



require('dotenv').config();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', require('./routes/userRoutes'));
// app.use('/api/location', require('./routes/userRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ message: err.message });
});

module.exports = app;
