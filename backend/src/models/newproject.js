import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
    {
        projectname:{
            type:String,
        },
        description:{
            type:String,
        },
        issue:{
            type:String,
        },
        priority:{
            type:String,
            enum:["high","medium","low"],
        },
    },
    { timestamps: true },
) 
const Project = mongoose.model("Project",projectSchema);
export default Project;
