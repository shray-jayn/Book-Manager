const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
    await connectDb();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Server is up and running");
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); 
    }
};

const mongooseDisconnect = async () => {
    await mongoose.disconnect();
    console.log("MongoDB connection is disconnected");
};

startServer();

module.exports = {
    connectDb,
    mongooseDisconnect,
};
