const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please provide a valid email address."],
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "First Name is required."],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required."],
            trim: true
        }
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;