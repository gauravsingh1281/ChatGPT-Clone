const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connectedDb = await mongoose.connect(process.env.MONGODB_URI);
        if (connectedDb) console.log(`MONGODB Connected Successfully at ${connectedDb.connection.host}`);
    } catch (error) {
        console.log(`MONGODB Failed to connect due to ${error.message}`);
        process.exit(1);
    };
};

module.exports = connectDb;