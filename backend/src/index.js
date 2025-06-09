import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import adminFormsRoutes from "./routes/adminform.route.js";
import taskRoute from "./routes/task.route.js";
import getAllUser from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth",authRoutes)
app.use("/api/admin",adminFormsRoutes)
app.use("/api/task",taskRoute)
app.use("/api/comment",commentRoutes)
app.use("/api",getAllUser)
app.use("/uploads", express.static("uploads"));
app.listen(PORT,()=>{
    console.log("Server is running on Port : " + PORT);
    connectDB();
});