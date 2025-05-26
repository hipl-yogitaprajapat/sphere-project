import Client from "../models/client.model.js";

export const clientProject = async(req,res)=>{
   const { projectname,description,priority } = req.body;
    try {
        if (!projectname || !description || !priority) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        const newProject = new Client({
            projectname,
            description,
            priority,
        })
        console.log(newProject,"newProject");

        if (newProject) {
            await newProject.save();
            res.status(201).json({
                message: "Project Add successfully",
                success: true
            })
        } else {
            res.status(400).json({ message: "Invalid project data", success: false })
        }

    } catch (error) {
        console.log("error in clientProject controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })
    }

}