import { validateImage } from "../lib/imageValidator.js";
import Project from "../models/newproject.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

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
      createdBy: req.user._id, 
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
    let query = {};

    switch (req.user.role) {
      case "developer":
      case "designer":
      case "tester":
        // See only tasks assigned to you
        query = { assignedTo: req.user._id };
        break;
    }

    const tasks = await Task.find(query)
      .populate("project",   "projectname")
      .populate("assignedTo","firstName lastName role")
      .populate("createdBy", "firstName lastName role")
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {name,description,project,designation,assignedTo,priority,status,dueDate} = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const users = await User.find({ _id: { $in: assignedTo } });
    const mismatchedUsers = users.filter(user => user.role !== designation);
    if (mismatchedUsers.length > 0) {
      return res.status(400).json({ message: "Assigned users do not match the selected designation" });
    }

    // Handle new file upload (optional)
    let filename = task.attachments; // keep old file by default
    if (req.file) {
      // Delete old image file
      if (task.attachments) {
        const oldPath = path.join("uploads", task.attachments);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      filename = validateImage(req.file);
    }    

    task.name = name;
    task.description = description;
    task.project = project;
    task.designation = designation;
    task.assignedTo = assignedTo;
    task.priority = priority;
    task.status = status;
    task.dueDate = dueDate;
    task.attachments = filename;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
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

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }

    const isAssigned = task.assignedTo.some(userId => userId.toString() === req.user._id.toString());

    if (!isAssigned) {
      return res.status(403).json({ message: "You are not allowed to update this task",success: false});
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Status updated successfully", task ,success: true});
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message ,success: false });
  }
};

