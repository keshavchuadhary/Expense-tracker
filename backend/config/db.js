const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB connected");
    } catch (err){
        console.error("MongoDB connection failed", err);
        process.exit(1);
    }
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose. It exports a function that attempts to connect to the database using the connection string stored in an environment variable.
//  If the connection is successful, it logs a success message; if it fails, it logs an error message and exits the process with a failure code.