const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const initSocketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    });

    // socket auth middleware
    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        const { token } = cookies;
        if (!token) {
            next(new Error("Authentication Error: No token provided."));
        }

        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decodedData.id).select("-password");
            socket.user = user;
        } catch (error) {
            next(new Error("Authentication error: Invalid Token"));
        };

        next();
    });


    io.on("connection", (socket) => {
        console.log("A user connected with id:", socket.id);
        socket.on("ai-message", async (msgPayload) => {
            console.log(msgPayload);
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected with id:", socket.id);
        })
    });
};

module.exports = initSocketServer;