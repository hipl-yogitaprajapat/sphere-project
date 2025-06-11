import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminUsersForm, createProject, dashboardSummary, deleteProject, editProject, viewProjects } from "../controllers/adminform.controller.js";
import { authorizeTaskRoles } from "../middleware/task.middleware.js";

const router = express.Router();

router.post("/addusersform",protectRoute, authorizeTaskRoles("admin"), adminUsersForm)
router.post("/create-project",protectRoute, authorizeTaskRoles("admin"), createProject)
router.get("/view-projects",protectRoute, authorizeTaskRoles("admin"), viewProjects)
router.put("/edit-project/:id",protectRoute, authorizeTaskRoles("admin"), editProject)
router.delete("/delete-project/:id",protectRoute, authorizeTaskRoles("admin"), deleteProject)
router.get("/dashboard",protectRoute, authorizeTaskRoles("admin"), dashboardSummary)


export default router