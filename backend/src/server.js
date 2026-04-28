import express from "express"
import cors from "cors"
import connectDb from "./config/db.js"
import config from "./config/env.js"
import userRoutes from "./routes/userRoutes.js"
import roofDrawingRoutes from "./routes/roofDrawingRoutes.js"
// import geolocationRoutes from "./routes/geolocationRoutes.js"


const port = config.port

const app = express()

app.use(express.json())
app.use(cors({
    origin:config.origin,
    credentials:true
}))

connectDb()

app.get("/", (req,res)=> {
    res.status(200).json({message:"Solar Installation API is running."})
})

app.use("/api/users", userRoutes)
app.use("/api/roof-drawings", roofDrawingRoutes)
// app.use("/api/geolocation", geolocationRoutes) // currently this route is not used in project because it needs a valid google map api key which is paid


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})