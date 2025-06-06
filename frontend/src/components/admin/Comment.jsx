import { useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const Comment = ({ comment, addReply, updateComment,deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showChildren, setShowChildren] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const inputRef = useRef(null);
 
  const handleReply = () => {
    setShowReplyBox(true);
    setTimeout(() => { inputRef.current?.focus(); }, 1);
  };

  const handleCancelReply = () => {
    setReplyText('');
    setShowReplyBox(false);
  };

  const handleReplySave = () => {
    addReply(comment._id, replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1);
  };

  const handleDelete=()=>{
    deleteComment(comment._id);
  }

  const handleEditSave = async () => {
      updateComment(comment._id, editText);
      setIsEditing(false);

  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const toggleChildren = () => {
    setShowChildren((prev) => !prev);
  };

  return (
    <>
  <ToastContainer/>
    <li className="mb-4">
      <div className="p-2 bg-gray-100 rounded-md shadow-sm">
        {isEditing ? (
          <>
            <input
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
            />
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-800">
              {comment.text} ({comment.user.firstName} {comment.user.lastName})
              <button
                className="ml-2 text-sm text-yellow-600 hover:underline"
                onClick={handleEdit}
              >
                ✏️ Edit
              </button>
              <button className="m-3" onClick={handleDelete}>❌</button>
            </p>
          </>
        )}

        {!showReplyBox && !isEditing && (
          <button
            onClick={handleReply}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            Reply
          </button>
        )}

        {showReplyBox && (
          <div className="mt-3 space-y-2">
            <input
              type="text"
              ref={inputRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <div className="flex gap-2">
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                onClick={handleReplySave}
              >
                Save
              </button>
              <button
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded"
                onClick={handleCancelReply}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {comment.children && comment.children.length > 0 && (
          <>
            <button
              onClick={toggleChildren}
              className="text-sm text-blue-500 hover:underline mt-2"
            >
              {showChildren
                ? 'Hide replies'
                : `View ${comment.children.length} repl${comment.children.length > 1 ? 'ies' : 'y'}`}
            </button>

            {showChildren && (
              <ul className="ml-4 mt-2">
                {comment.children.map((child) => (
                  <Comment
                    key={child._id}
                    comment={child}
                    addReply={addReply}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </li>
      </>
  );
};

export default Comment;
