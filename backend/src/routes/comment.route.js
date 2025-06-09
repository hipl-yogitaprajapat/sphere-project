import express from "express";
import { createComment, deleteComment, editComment, getCommentsByTask } from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../lib/profile.js";

const router = express.Router();

router.post("/create",protectRoute,upload.single("attachment"),createComment )
router.get("/:taskId", protectRoute, getCommentsByTask);
router.put("/edit/:commentId", protectRoute,upload.single("attachment"), editComment);
router.delete("/delete/:commentId", protectRoute, deleteComment);


export default router