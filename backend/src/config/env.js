import dotenv from "dotenv"
dotenv.config()

const config = {
    port:process.env.PORT || 8000,
    mongoUri:process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dbname",
    origin:process.env.ORIGIN || "http://localhost:5173"
}

export default config;