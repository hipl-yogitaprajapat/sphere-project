import Project from "../models/newproject.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
export const adminUsersForm = async (req, res) => {
    const { firstName, lastName, company, email, password, role } = req.body;
    try {
        if (!firstName || !lastName || !company || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 character", success: false })
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email is already exist", success: false })

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            company,
            email,
            role,
            password: hashPassword
        })
        console.log(newUser, "newUser");

        if (newUser) {
            await newUser.save();

            res.status(201).json({
                message: "Registration successfully",
                success: true
            })

        } else {
            res.status(400).json({ message: "Invalid user data", success: false })
        }

    } catch (error) {
        console.log("error in admin client form controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const createProject = async (req, res) => {
    const { projectname, description, issue, priority, status } = req.body;
    try {
        if (!projectname || !description || !priority || !issue || !status) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        const newProject = new Project({
            projectname,
            description,
            priority,
            issue,
            status,
            createdBy: req.user._id,
        })

        if (newProject) {
            await newProject.save();
            res.status(201).json({
                message: "Project Created successfully",
                success: true
            })
        } else {
            res.status(400).json({ message: "Invalid project data", success: false })
        }
    } catch (error) {
        console.log("error in new project controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const viewProjects = async (req, res) => {
    try {
        const userRole = req.user.role;

        let projects;
        if (userRole === "admin") {
            projects = await Project.find().populate("createdBy", "firstName lastName email");
        } else {
            return res.status(403).json({ message: "Unauthorized role", success: false });
        }
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found", success: false });
        }

        return res.status(200).json({ message: "Projects fetched successfully", success: true, data: projects });
    } catch (error) {
        console.error("Error fetching project:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const editProject = async (req, res) => {
    const { projectname, description, issue, priority, status } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    try {
        if (!projectname || !description || !priority || !issue || !status) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found", success: false })}

    if (project.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this project", success: false })}

        const updateProject = await Project.findByIdAndUpdate(
            id,
            { projectname, description, issue, priority, status },
            { new: true },
        )

        return res.status(200).json({message: "Project updated successfully",success: true,updateProject,});

    } catch (error) {
        console.log("error in edit project controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProject = await Project.findByIdAndDelete(id)
        if (!deleteProject) return res.status(404).json({ message: "Project not found", success: false });

        return res.status(200).json({
            message: "Project deleted successfully",
            success: true,
            deleteProject,
        });

    } catch (error) {
        console.log("error in delete project controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })
    }
};

