import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    designation: {
    type: String,
    enum: ['developer', 'tester', 'designer'],
    required: true,
    },
    assignedTo: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "high",
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending",
    },
    dueDate: {
        type: Date,
    },
    attachments: {
        type: String,
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
