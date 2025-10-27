require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/db.config");
const { createServer } = require("http");
const initSocketServer = require("./src/sockets/socket.server");

const port = process.env.PORT || 3000;

const httpServer = createServer(app);
initSocketServer(httpServer);
connectDb();


httpServer.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});

