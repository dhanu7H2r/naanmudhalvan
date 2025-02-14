const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like HTML)

// Database Connection
const db = mysql.createConnection({
    host: 'localhost', // Change if needed
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'brain_bloom_quiz' // Change to your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database ✅');
    }
});

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(400).json({ message: "User not found" });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Error comparing passwords" });
            if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

            const token = jwt.sign({ userId: user.id, email: user.email }, "your_secret_key", { expiresIn: '1h' });
            res.json({ message: "Login successful", token });
        });
    });
});

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});
