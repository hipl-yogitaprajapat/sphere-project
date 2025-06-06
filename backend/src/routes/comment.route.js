import express from "express";
import { createComment, deleteComment, editComment, getCommentsByTask } from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",protectRoute,createComment )
router.get("/:taskId", protectRoute, getCommentsByTask);
router.put("/edit/:commentId", protectRoute, editComment);
router.delete("/delete/:commentId", protectRoute, deleteComment);


export default router