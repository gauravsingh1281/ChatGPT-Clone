const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorised token not found." });
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedData) return res.status(401).json({ message: "Unauthorised Invalid token" });
        const authorisedUser = await User.findById(decodedData.id).select("-password");
        req.user = authorisedUser;
        next();
    } catch (error) {
        console.log("Error in authUser middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    };

};

module.exports = { authUser };