import express from "express";
import { clientProject } from "../controllers/client.controller.js";


const router = express.Router();

router.post("/project",clientProject)
export default router