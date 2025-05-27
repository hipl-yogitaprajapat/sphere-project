import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import clientRoutes from "./routes/client.route.js";
import adminFormsRoutes from "./routes/adminform.route.js";
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
app.use("/api/client",clientRoutes)
app.use("/api/admin",adminFormsRoutes)
app.use("/uploads", express.static("uploads"));
app.listen(PORT,()=>{
    console.log("Server is running on Port : " + PORT);
    connectDB();
});