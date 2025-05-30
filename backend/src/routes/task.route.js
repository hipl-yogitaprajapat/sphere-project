import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { authorizeTaskRoles } from "../middleware/task.middleware.js";
import { createTask, deleteTask, getAllTasks } from "../controllers/task.controller.js";
import upload from "../lib/profile.js";

const router = express.Router();

router.post("/create-task",protectRoute, authorizeTaskRoles("admin", "developer"),upload.single("attachments"), createTask)
router.get("/tasks", getAllTasks);
router.delete('/delete-task/:id', deleteTask);

export default router