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
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    feedbacks: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            feedback: { type: String },
            date: { type: String },
            time: { type: String },
        },
    ],
    reviewStatus: {
        type: String,
        enum: ["pending","approved", "rejected"],
        default: "pending",
    },
    locked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
