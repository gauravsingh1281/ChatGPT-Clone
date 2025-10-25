require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/db.config");
const port = process.env.PORT || 3000;


app.listen(port, () => {
    connectDb();
    console.log(`Server started listening on port ${port}`);
});

