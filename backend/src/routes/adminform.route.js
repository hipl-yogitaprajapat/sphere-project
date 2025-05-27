import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminUsersForm, createProject, viewProjects } from "../controllers/adminform.controller.js";
import { adminOnly } from "../middleware/adminonly.middleware.js";

const router = express.Router();

router.post("/addusersform",protectRoute, adminOnly, adminUsersForm)
router.post("/create-project",protectRoute, adminOnly, createProject)
router.get("/view-projects",protectRoute, adminOnly, viewProjects)

export default router