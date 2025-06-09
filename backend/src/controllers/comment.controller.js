import { validateFile } from "../lib/fileValidator.js";
import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";
import fs from "fs";
import path from "path";

export const createComment = async (req, res) => {
  try {
    const { taskId, text, parentId } = req.body;
    const userId = req.user._id;    

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const filename = req.file ? validateFile(req.file,['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'],5) : null;

    const isAuthorized = task.createdBy?.toString() === userId?.toString() ||
                         task.assignedTo.some(uid => uid?.toString() === userId?.toString());

    if (!isAuthorized) {
      return res.status(403).json({ message: "You are not allowed to comment on this task" });
    }

    let normalizedParentId = null;
    if (parentId && parentId !== "null" && parentId !== "undefined" && parentId.trim() !== "") {
      normalizedParentId = parentId;
    }
    
    const newComment = new Comment({
      taskId,
      user: userId,
      text,
      attachments: filename,
      ...(normalizedParentId && { parent: normalizedParentId }),
    });

    const savedComment = await newComment.save();

    // If it's a reply, update parent's children
    if (normalizedParentId) {
      await Comment.findByIdAndUpdate(normalizedParentId, {
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

export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can only edit your own comment" });
    }

    const task = await Task.findById(comment.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(uid => uid.toString() === userId.toString());

    if (!isAssigned) {
      return res.status(403).json({ message: "You are not authorized to edit comments on this task" });
    }

       if (req.file) {
      const newFileName = validateFile(req.file, ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'], 5);

      if (comment.attachments) {
        const oldFilePath = path.join("uploads", comment.attachments);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      comment.attachments = newFileName;
    }

    comment.text = text;
    const updatedComment = await comment.save();

    const populated = await updatedComment.populate("user", "firstName lastName");
    res.status(200).json({ message: "Comment updated successfully", comment: populated });
  } catch (error) {
    console.error("Edit comment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can only delete your own comment" });
    }

    // Remove reference from parent comment (if it has one)
    if (comment.parent) {
      await Comment.findByIdAndUpdate(comment.parent, {
        $pull: { children: comment._id },
      });
    }

    // Recursively delete all child comments
    const deleteChildrenRecursively = async (parentId) => {
      const children = await Comment.find({ parent: parentId });
      for (const child of children) {
        await deleteChildrenRecursively(child._id);
        await Comment.findByIdAndDelete(child._id);
      }
    };

    await deleteChildrenRecursively(comment._id);

    // Delete the main comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
