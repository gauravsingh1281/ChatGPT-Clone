const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const cors = require("cors");

// express instance
const app = express();

// middlewares
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}))
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);


module.exports = app;