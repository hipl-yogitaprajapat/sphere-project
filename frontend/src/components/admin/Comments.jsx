import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewTaskDetails } from "../../redux/slice/taskSlice";
import { addReplyComment, createNewComment, deleteComments, fetchComments, updateComments } from "../../redux/slice/commentSlice";
import { handleError, handleSuccess } from "../../utils/Error";
import { useRef } from "react";

const Comments = () => {
  const { id } = useParams();
  const [input, setInput] = useState('');
  const [File, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { task } = useSelector((state) => state.tasks);
  const taskData = task.find((t) => t._id === id);
  const { comments = [] } = useSelector((state) => state.comment);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewTaskDetails());
    dispatch(fetchComments({ id }));
  }, [dispatch, id]);

  const handleNewComment = async () => {
    try {
      const formData = new FormData();
      formData.append("text", input);
      formData.append("taskId", id);
      if (File) {
        formData.append("attachment", File);
      }      
      const response = await dispatch(createNewComment(formData)).unwrap();
      handleSuccess(response.message);
      await dispatch(fetchComments({ id }));
      setInput("");
      setFile(null);
       if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    } catch (error) {
      handleError(error);
    }
  }

  const addReply = async (formData) => {
    try {
      const response = await dispatch(addReplyComment(formData)).unwrap();
      handleSuccess(response.message);
      await dispatch(fetchComments({ id }));
    } catch (error) {
      handleError(error);
    }
  }

  const updateComment = async (commentId, formData) => {
    try {
      const response = await dispatch(updateComments({ commentId, formData })).unwrap();
      handleSuccess(response.message);
      await dispatch(fetchComments({ id }));
    } catch (error) {
      handleError(error);
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await dispatch(deleteComments({ commentId })).unwrap();
      handleSuccess(response.message);
      await dispatch(fetchComments({ id }));
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto pl-6 bg-white rounded shadow mt-6" style={{ maxHeight: '550px', overflowY: 'auto', border: '1px solid #dee2e6' }}>
      <div style={{ position: 'sticky', top: 0, background: "#fff", zIndex: 2 }}>
        {taskData && (
          <div className="mb-6 pt-2" >
            <h2 className="text-2xl font-bold mb-2">{taskData.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {taskData.description}</p>
            <p className="text-gray-700 mb-1"><strong>Status:</strong> {taskData.status}</p>
            <p className="text-gray-700 mb-1"><strong>Priority:</strong> {taskData.priority}</p>
            <p className="text-gray-700 mb-1"><strong>Project:</strong> {taskData.project?.projectname}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-[180px] border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            onClick={handleNewComment}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Add Comment
          </button>
        </div>
      </div>

      <div>
        {comments && comments.length > 0 && (
          comments.map((item) => (
            <Comment key={item._id} comment={item} addReply={addReply} updateComment={updateComment} deleteComment={deleteComment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
