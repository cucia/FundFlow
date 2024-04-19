// src/controllers/authController.js
const bcrypt = require('bcrypt');
const connection = require('../config/dbConfig');

const saltRounds = 10;

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.error('Error registering user:', err.message);
                    return res.status(400).send('Email already exists');
                }
                console.error('Error registering user:', err.message);
                return res.status(500).send('Failed to register user');
            }
            console.log('User registered successfully');
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('Error retrieving user:', err.message);
            return res.status(500).send('Failed to retrieve user');
        }
        if (result.length === 0) {
            return res.status(400).send('Email not found');
        }
        const user = result[0];
        try {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, { expiresIn: '1h' });
                console.log('Login successful');
                res.status(200).json({ token });
            } else {
                console.log('Incorrect password');
                res.status(401).send('Incorrect password');
            }
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    });
};