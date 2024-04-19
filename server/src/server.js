// src/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
