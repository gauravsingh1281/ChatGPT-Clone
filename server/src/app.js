const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}))
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello");
})

module.exports = app;