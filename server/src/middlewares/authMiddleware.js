// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

exports.generateToken = (user) => {
    const token = jwt.sign(user, jwtConfig.secret, { expiresIn: '1h' });
    return token;
};
