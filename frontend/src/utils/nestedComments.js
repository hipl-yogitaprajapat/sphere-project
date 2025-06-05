  // 🔁 CHANGE HERE — Utility to insert reply into nested comments
 export const insertReply = (commentList, parentId, newReply) => {
    console.log(commentList,"commentList");
    
    for (let comment of commentList) {
      if (comment._id === parentId) {
        comment.children = comment.children || [];
        comment.children.unshift(newReply);
        return true;
      } else if (comment.children?.length) {
        const inserted = insertReply(comment.children, parentId, newReply);
        console.log(inserted,"inserted");
        
        if (inserted) return true;
      }
    }
    return false;
  };