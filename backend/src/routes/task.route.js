import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { authorizeTaskRoles } from "../middleware/task.middleware.js";
import { createTask, deleteTask, getAllTasks, reviewTask, updateTask, updateTaskStatus } from "../controllers/task.controller.js";
import upload from "../lib/profile.js";

const router = express.Router();

router.post("/create-task",protectRoute, authorizeTaskRoles("admin"),upload.single("attachments"), createTask)
router.get("/tasks",protectRoute, getAllTasks);
router.put("/update/:id",protectRoute, upload.single("attachments"), updateTask);
router.delete('/delete-task/:id',protectRoute, deleteTask);
router.patch("/update-status/:id", protectRoute, updateTaskStatus);
router.put("/review-status/:id", protectRoute, reviewTask);

export default router