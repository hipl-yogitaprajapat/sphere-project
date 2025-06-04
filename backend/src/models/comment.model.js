import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
