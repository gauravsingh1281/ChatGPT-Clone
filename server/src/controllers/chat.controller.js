const Chat = require("../models/chat.model");
const createChat = async (req, res) => {
    const { title } = req.body;
    const user = req.user;
    try {
        const newChat = await Chat.create({
            user: user._id,
            title,
        });
        res.status(201).json({
            message: "Chat created successfully",
            chat: {
                id: newChat._id,
                title: newChat.title,
                lastActivity: newChat.lastActivity,
                user: newChat.user,
            }
        });
    } catch (error) {
        console.log("Error in create chat controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

module.exports = { createChat };