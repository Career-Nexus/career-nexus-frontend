import express from express
const express = require('express');
const authRoutes = require('./routes/authRoutes');  // Path to your auth routes
const connectDB = require('./config/db'); // Import the connectDB function

const app = express();

// Connect to MongoDB
connectDB();

// Middleware and routes here...
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Ensure the route is correct

app.listen(5000, () => console.log('Server is running on port 5000'));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));














