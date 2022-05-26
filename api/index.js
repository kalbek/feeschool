import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import schoolsRoute from "./routes/schools.js"
import studentsRoute from "./routes/students.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()
const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(`Connected to mongoDB: ${conn.connection.host}`);
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

// middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/schools", schoolsRoute)
app.use("/api/students", studentsRoute)
app.use("/api/users", usersRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("connected to backend")
})