import express from "express";
import { createComment, getCommentsByTask } from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",protectRoute,createComment )
router.get("/:taskId", protectRoute, getCommentsByTask);



export default router