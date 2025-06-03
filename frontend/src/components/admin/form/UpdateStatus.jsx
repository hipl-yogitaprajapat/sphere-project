import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../utils/Error';
import {  updateTaskStatus } from '../../../redux/slice/taskSlice';

const UpadteStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [taskstatusInfo, setTaskStatusInfo] = useState({
        status: '',
        comment:""
    });    

    const { task } = useSelector((state) => state.tasks);

    useEffect(() => {
        if (Array.isArray(task)) {
            const statusUpdate = task.find(t => t?._id === id);
            if (statusUpdate) {
                setTaskStatusInfo({
                    status: statusUpdate.status || '',
                });
            }
        }
    }, [task, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(updateTaskStatus({ id, taskstatusInfo })).unwrap();
            handleSuccess(response.message);
            setTimeout(() => navigate("/developer"), 1000);
        } catch (err) {
            handleError(err);
        }
    };

    return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h4 className="mb-4 text-primary">Update Task Status</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="status" className="form-label fw-bold">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              value={taskstatusInfo.status}
              onChange={(e) =>
                setTaskStatusInfo({
                  ...taskstatusInfo,
                  status: e.target.value,
                })
              }
              required
            >
              <option value="">-- Select Status --</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>           
          <div className="mb-3">
            <label htmlFor="comment" className="form-label fw-bold">Add Comment</label>
            <textarea
              id="comment"
              className="form-control"
              rows="4"
              placeholder="Enter your comment..."
              value={taskstatusInfo.comment}
              onChange={(e) =>
                setTaskStatusInfo({
                  ...taskstatusInfo,
                  comment: e.target.value
                })
              }
            >    
            </textarea>
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-success">
              Update Status
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/view-task')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpadteStatus;
