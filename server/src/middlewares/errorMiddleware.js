// src/middlewares/errorMiddleware.js
module.exports = (err, req, res, next) => {
    console.error('An error occurred:', err.message);
    res.status(500).send('Internal Server Error');
  };
  