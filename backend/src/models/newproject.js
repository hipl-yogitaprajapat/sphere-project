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
         status:{
            type:String,
            enum:["active","hold","complete"],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    { timestamps: true },
) 
const Project = mongoose.model("Project",projectSchema);
export default Project;
