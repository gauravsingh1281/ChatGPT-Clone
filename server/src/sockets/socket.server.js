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

            const [userMsg, userMsgVectorsEmbedding] = await Promise.all([
                // saving user message to mongodb
                Message.create({
                    chat: msgPayload.chat,
                    user: socket.user._id,
                    content: msgPayload.content,
                    role: "user",
                }),

                // converting user message in vector embeddings 
                aiService.generateVectorEmbedding(msgPayload.content),

            ]);
            // saving user message vector to vector db
            createMemory({
                vectors: userMsgVectorsEmbedding,
                messageId: userMsg._id,
                metadata: {
                    chat: msgPayload.chat,
                    user: socket.user._id,
                    text: msgPayload.content,
                    role: "user"
                }
            })

            // Search memory 
            const [memory, chatHistory] = await Promise.all([
                // from vector db
                queryMemory({
                    queryVector: userMsgVectorsEmbedding,
                    limit: 6,
                    metadata: {
                        user: socket.user._id,
                    }
                }),
                //  from mongodb
                Message.find({ chat: msgPayload.chat }).sort({ createdAt: -1 }).limit(20).lean().then(message => message.reverse())
            ])


            const shortTermMemory = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }],
                }
            })

            // long term memory
            const longTermMemory = [
                {
                    role: "user",
                    parts: [{
                        text: `These are some previous messages from the chat, use them to generate a response ${memory.map(item => item.metadata.text).join("\n")}`
                    }]
                }
            ]

            console.log([...longTermMemory, ...shortTermMemory]);


            const aiResponseMessage = await aiService.generateResponse([...longTermMemory, ...shortTermMemory]);

            socket.emit("ai-response", {
                content: aiResponseMessage,
                chat: msgPayload.chat
            });

            const [aiModelResponse, aiModelResponseVectorsEmbedding] = await Promise.all([
                // saving ai model response message to mongodb
                Message.create({
                    chat: msgPayload.chat,
                    user: socket.user._id,
                    content: aiResponseMessage,
                    role: "model"
                }),
                // converting ai model response in vector embeddings 
                aiService.generateVectorEmbedding(aiResponseMessage)

            ]);

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


        })

        socket.on("disconnect", () => {
            console.log("A user disconnected with id:", socket.id);
        })
    });
};

module.exports = initSocketServer;