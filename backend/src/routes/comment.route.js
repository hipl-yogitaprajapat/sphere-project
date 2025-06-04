import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createComment, getCommentsByTask } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create",protectRoute,createComment )
router.get("/:taskId", protectRoute, getCommentsByTask);



export default router