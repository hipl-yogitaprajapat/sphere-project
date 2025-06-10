import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../utils/Error';
import { updateTaskStatus } from '../../../redux/slice/taskSlice';
import { RedirectPath } from '../../../utils/RedirectPath';

const UpadteStatus = () => {
  const role = localStorage.getItem("role")
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [taskstatusInfo, setTaskStatusInfo] = useState({
    status: '',
    feedback: "",
    feedbacks: []
  });

  const { task } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (Array.isArray(task)) {
      const statusUpdate = task.find(t => t?._id === id);
      if (statusUpdate) {
        setTaskStatusInfo({
          status: statusUpdate.status || '',
          feedbacks: statusUpdate.feedbacks || []
        });
      }
    }
  }, [task, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateTaskStatus({ id, taskstatusInfo })).unwrap();
      handleSuccess(response.message);
      setTimeout(() => navigate(RedirectPath()), 1000);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h4 className="mb-4 text-primary">Update Task Status</h4>
        {role !== "admin" ? (
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
          <div>
            <label className="form-label fw-bold">Feedback</label>
            <textarea className="form-control" value={taskstatusInfo.feedback} onChange={(e) => setTaskStatusInfo({ ...taskstatusInfo, feedback: e.target.value })} placeholder="share feedback" />
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
        ) : (
          <>
          {taskstatusInfo.feedbacks.length > 0 ? (
            <div className="mt-4">
              <h5 className="fw-bold mb-3 text-secondary">Previous Feedback</h5>
              <div className="list-group " style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #dee2e6' }}>
                {[...taskstatusInfo.feedbacks].reverse().map((fb, index) => (
                  <div
                    key={index}
                    className="list-group-item list-group-item-action d-flex flex-column align-items-start"
                  >
                    <div className="d-flex justify-content-between w-100">
                      <h6 className="mb-1 fw-semibold text-primary">Feedback {index + 1}</h6>
                      <small className="text-muted">
                        {fb.date}--  {fb.time}
                      </small>
                    </div>
                    <p className="mb-1 mt-2 text-dark">{fb.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          ):(  
          <div className="mt-4">
        <h5 className="fw-bold mb-3 text-secondary">Previous Feedback</h5>
        <p className="text-muted flex justify-center"> No feedbacks.</p>
      </div>
      )}
      </>
        )}
          
      </div>
    </div>
  );
};

export default UpadteStatus;
