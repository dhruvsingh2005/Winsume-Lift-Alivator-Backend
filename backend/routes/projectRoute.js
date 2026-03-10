import express from "express";
import { addProject, listProjects, removeProject } from "../controllers/projectController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const projectRouter = express.Router();

projectRouter.post("/add", adminAuth, upload.single("image"), addProject);
projectRouter.get("/list", listProjects);
projectRouter.post("/remove", adminAuth, removeProject);

export default projectRouter;
