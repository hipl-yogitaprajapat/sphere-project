import express from "express";
import { checkAuth, forgetpassword, googleLogin, login, logout, resetpassword, signup, updateProfile, viewProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../lib/profile.js";

const router = express.Router();

router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.post("/forget-password",forgetpassword)
router.post("/reset-password/:id/:token",resetpassword)
router.get("/check",protectRoute,checkAuth)
router.put("/update-profile", protectRoute,upload.single("image"), updateProfile);
router.get("/google",googleLogin)
router.get("/view-profile",protectRoute,viewProfile)
export default router