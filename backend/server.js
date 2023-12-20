const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// MongoDB Connection
connectDB();

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


// Error Handler
app.use(errorHandler);

// Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
