const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    const { email, fullName: { firstName, lastName }, password } = req.body;
    try {
        if (!email || !firstName || !lastName || !password) return res.status(400).json({ message: "All fields are required." });
        const isUserAlreadyExists = await User.findOne({ email });
        if (isUserAlreadyExists) return res.status(409).json({ message: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            fullName: {
                firstName, lastName
            },
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: "User registered successfully", user: {
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
            }
        });
    } catch (error) {
        console.log("Error in register controller:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: "All fields are required." });
        const isUserExists = await User.findOne({ email });
        if (!isUserExists) return res.status(400).json({ message: "Invalid Credentials." });

        const validPassword = await bcrypt.compare(password, isUserExists.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid Credentials." });

        const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };
        res.status(200).json({
            message: "User loggedIn successfully", user: {
                id: isUserExists._id,
                email: isUserExists.email,
                fullName: isUserExists.fullName,
            }
        })
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const logout = async (_, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        console.log("Error in logout controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

const getCurrentUser = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        if (!authenticatedUser) return res.status(401).json({ message: "Unauthorized." });
        res.status(200).json({ user: authenticatedUser });
    } catch (error) {
        console.log("Error in getCurrentUser controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

module.exports = { register, login, logout, getCurrentUser };