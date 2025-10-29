const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const aiService = require("../services/ai.service");
const Message = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");
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
            // saving user message to mongodb
            const userMsg = await Message.create({
                chat: msgPayload.chat,
                user: socket.user._id,
                content: msgPayload.content,
                role: "user",
            });

            // converting user message in vector embeddings 
            const userMsgVectorsEmbedding = await aiService.generateVectorEmbedding(msgPayload.content);

            // Search memory 
            const memory = await queryMemory({
                queryVector: userMsgVectorsEmbedding,
                limit: 3,
                metadata: {
                }
            });

            // saving user message vector to vector db
            await createMemory({
                vectors: userMsgVectorsEmbedding,
                messageId: userMsg._id,
                metadata: {
                    chat: msgPayload.chat,
                    user: socket.user._id,
                    text: msgPayload.content,
                    role: "user"
                }
            });

            console.log("memory", memory);
            // short term memory
            const chatHistory = (await Message.find({ chat: msgPayload.chat }).sort({ createdAt: -1 }).limit(20).lean()).reverse();


            const aiResponseMessage = await aiService.generateResponse(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }],
                }
            }));
            // saving ai model response message to mongodb
            const aiModelResponse = await Message.create({
                chat: msgPayload.chat,
                user: socket.user._id,
                content: aiResponseMessage,
                role: "model"
            });

            // converting ai model response in vector embeddings 
            const aiModelResponseVectorsEmbedding = await aiService.generateVectorEmbedding(aiResponseMessage);
            // saving ai model response vector to vector db

            await createMemory({
                vectors: aiModelResponseVectorsEmbedding,
                messageId: aiModelResponse._id,
                metadata: {
                    chat: msgPayload.chat,
                    user: socket.user._id,
                    text: aiResponseMessage,
                    role: "model"
                }
            })

            socket.emit("ai-response", {
                content: aiResponseMessage,
                chat: msgPayload.chat
            });
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected with id:", socket.id);
        })
    });
};

module.exports = initSocketServer;