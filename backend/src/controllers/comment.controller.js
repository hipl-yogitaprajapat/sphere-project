import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";

export const createComment = async (req, res) => {
  try {
    const { taskId, text, parentId } = req.body;
    const userId = req.user._id;    

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAuthorized = task.createdBy?.toString() === userId?.toString() ||
                         task.assignedTo.some(uid => uid?.toString() === userId?.toString());

    if (!isAuthorized) {
      return res.status(403).json({ message: "You are not allowed to comment on this task" });
    }

    const newComment = new Comment({
      taskId,
      user: userId,
      text,
      parent: parentId || null,
    });

    const savedComment = await newComment.save();

    // If it's a reply, update parent's children
    if (parentId) {
      await Comment.findByIdAndUpdate(parentId, {
        $push: { children: savedComment._id }
      });
    }

    const populatedComment = await savedComment.populate("user", "firstName lastName");

    res.status(201).json({ message: "Comment added", comment: populatedComment });
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Fetch top-level comments (those without a parent)
    const topLevelComments = await Comment.find({ taskId, parent: null })
      .populate("user", "firstName lastName role")
      .sort({ createdAt: -1 });

    // Recursively populate children
    const nestedComments = await Promise.all(
      topLevelComments.map(async (comment) => await populateChildren(comment))
    );

    res.status(200).json({ comments: nestedComments });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Helper: Recursive function to populate children
const populateChildren = async (comment) => {
  const children = await Comment.find({ parent: comment._id })
    .populate("user", "firstName lastName role")
    .sort({ createdAt: -1 });

  const populatedChildren = await Promise.all(
    children.map(async (child) => await populateChildren(child))
  );

  const commentObj = comment.toObject();
  commentObj.children = populatedChildren;
  return commentObj;
};
