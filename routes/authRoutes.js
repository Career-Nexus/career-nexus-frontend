import express from 'express';
import bcrypt from 'bcryptjs';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser } = require('../controllers/authController');  // Register function
const router = express.Router();

// Dummy database (you can replace this with a real database like MongoDB or MySQL)
const users = [];

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    router.post('/register', registerUser);
    
    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user and store in the "database"
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;
