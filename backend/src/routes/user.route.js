import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersByRole } from "../controllers/alluser.controller.js";

const router = express.Router();

//get all user by their role (if i select developer then filter out all developer users)
router.get("/role",protectRoute, getUsersByRole)


export default router