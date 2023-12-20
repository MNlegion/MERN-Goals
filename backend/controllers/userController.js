const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Purpose: Register a new User
// Notes: @route POST /api/users
// Notes: Public route
const registerUser = asyncHandler(async (req, res) => {
    res.json({message: "Register User"});
});

// Purpose: Authenticate a User & get a token
// Notes: @route POST /api/users/login
// Notes: Public route
const loginUser = asyncHandler(async (req, res) => {
    res.json({message: "Login User"});
});

// Purpose: Get user profile data
// Notes: @route GET /api/users/me
// Notes: Public route
const getMe = asyncHandler(async (req, res) => {
    res.json({message: "User Profile"});
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};