import mongoose from "mongoose"
import config from "./env.js"

const connectDb = async() => {
    try{
        await mongoose.connect(config.mongoUri)
        console.log("Database connnected.")
    }catch(error){
        console.log("Database connection error:", error);
        process.exit(1)
    }
}

export default connectDb