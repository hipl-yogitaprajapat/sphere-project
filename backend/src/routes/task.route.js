import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { authorizeTaskRoles } from "../middleware/task.middleware.js";
import { createTask } from "../controllers/task.controller.js";
import upload from "../lib/profile.js";

const router = express.Router();

router.post("/create-task",protectRoute, authorizeTaskRoles("admin", "developer"),upload.single("attachments"), createTask)


export default router