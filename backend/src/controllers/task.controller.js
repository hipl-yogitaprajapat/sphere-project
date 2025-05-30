import { validateImage } from "../lib/imageValidator.js";
import Project from "../models/newproject.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async(req, res) => {
  try {
    const {name,description,project,designation,assignedTo,priority,status,dueDate} = req.body;

    if (!name || !project || !designation ||!status|| !assignedTo || assignedTo.length === 0) {
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


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('project', 'projectname') // Populate project name 
      .populate('assignedTo', 'firstName lastName') // Populate firstName, firstName
      .sort({ createdAt: -1 }); // Sort by most recent first (optional)

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


