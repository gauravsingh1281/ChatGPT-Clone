const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const aiService = require("../services/ai.service");
const Message = require("../models/message.model");
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


    io.on("connection", async (socket) => {
        console.log("A user connected with id:", socket.id);
        socket.on("ai-message", async (msgPayload) => {
            // user message
            await Message.create({
                chat: msgPayload.chat,
                user: socket.user._id,
                content: msgPayload.content,
                role: "user",
            });

            // short term memory
            const chatHistory = (await Message.find({ chat: msgPayload.chat }).sort({ createdAt: -1 }).limit(20).lean()).reverse();


            const aiResponse = await aiService.generateResponse(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }],
                }
            }));
            // ai model response message
            await Message.create({
                chat: msgPayload.chat,
                user: socket.user._id,
                content: aiResponse,
                role: "model",
            });

            socket.emit("ai-response", {
                content: aiResponse,
                chat: msgPayload.chat
            });
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected with id:", socket.id);
        })
    });
};

module.exports = initSocketServer;