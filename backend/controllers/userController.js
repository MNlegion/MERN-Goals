const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Purpose: Register a new User
// Notes: @route POST /api/users
// Notes: Public route
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body;
    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            // token: generateToken(newUser._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user credentials");
    }
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