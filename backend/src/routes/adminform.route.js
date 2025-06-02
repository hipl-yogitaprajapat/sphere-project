import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminUsersForm, createProject, deleteProject, editProject, viewProjects } from "../controllers/adminform.controller.js";
import { adminOnly } from "../middleware/adminonly.middleware.js";
import { authorizeTaskRoles } from "../middleware/task.middleware.js";

const router = express.Router();

router.post("/addusersform",protectRoute, adminOnly, adminUsersForm)
router.post("/create-project",protectRoute, adminOnly, createProject)
router.get("/view-projects",protectRoute, authorizeTaskRoles("admin", "developer"), viewProjects)
router.put("/edit-project/:id",protectRoute, adminOnly, editProject)
router.delete("/delete-project/:id",protectRoute, adminOnly, deleteProject)

export default router