import { validateImage } from "../lib/imageValidator.js";
import Project from "../models/newproject.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async(req, res) => {
  try {
    const {name,description,project,designation,assignedTo,priority,status,dueDate} = req.body;

    if (!name || !project || !designation || !assignedTo || assignedTo.length === 0) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const filename = req.file ? validateImage(req.file) : null;
    const users = await User.find({ _id: { $in: assignedTo } });
    const mismatchedUsers = users.filter(user => user.role !== designation);
    if (mismatchedUsers.length > 0) {
      return res.status(400).json({ message: "Assigned users do not match the selected designation" });
    }

    const task = new Task({
      name,
      description,
      project,
      designation,
      assignedTo,
      priority,
      status,
      dueDate,
      attachments: filename,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
