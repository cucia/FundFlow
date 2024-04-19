// src/config/jwtConfig.js
require('dotenv').config();

const jwtConfig = {
  secret: process.env.JWT_SECRET
};

module.exports = jwtConfig;
