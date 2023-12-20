const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    // Purpose: To protect routes
    // Notes: This middleware will protect routes
    // Notes: This middleware will be used in the server.js file
    // Notes: This middleware will be used after the routes
    let token;

    // Check if token exists
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            // Split token from "Bearer" string
            // Get token from index 1 - token is formated as Bearer [token]
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token id which I set in generateToken() in userController.js
            // I can set this to anything I want - using "id" for now
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = {
    protect,
};