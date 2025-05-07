const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn:"1h"});
}

// Register user
exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body;
    
    // Validate: Check for missing fields

    if(!fullname || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try{
        // check if email already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new user
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
            message: "User registered successfully"
        });

    } catch (err){
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate: Check for missing fields
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        // Check if user exists
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
            message: "User logged in successfully"
        });

    } catch (err){
        res
            .status(500)
            .json({ message: "Error logging in user", error: err.message });
    }
};

// Get user info
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err){
        res
            .status(500)
            .json({ message: "Error fetching user info", error: err.message });
    }
};

