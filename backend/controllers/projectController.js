import projectModel from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

// INFO: Function to add project
const addProject = async (req, res) => {
  try {
    const { title, location, year, description, category } = req.body;

    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const projectData = {
      title,
      location,
      year,
      description,
      category,
      image: imageUrl,
      date: Date.now(),
    };

    const project = new projectModel(projectData);
    await project.save();

    res.json({ success: true, message: "Project Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Function to list projects
const listProjects = async (req, res) => {
  try {
    const projects = await projectModel.find({});
    res.json({ success: true, projects });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Function to remove project
const removeProject = async (req, res) => {
  try {
    await projectModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Project Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProject, listProjects, removeProject };
