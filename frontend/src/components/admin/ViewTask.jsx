import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTaskStatus, viewTaskDetails } from '../../redux/slice/taskSlice';
import { handleError, handleSuccess } from '../../utils/Error';
import { RedirectPath } from '../../utils/RedirectPath';

const ViewTask = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.tasks);
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_URL;
  useEffect(() => {
    dispatch(viewTaskDetails());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteTask({ id })).unwrap();
      handleSuccess(response.message);
      navigate(RedirectPath(role));
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">All Tasks</h4>
        {role === "admin" && (
          <button onClick={() => navigate("/create-task")} className="btn btn-sm btn-primary">
            + New Task
          </button>
        )}
      </div>

      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #dee2e6' }}>
        <table className="table table-bordered table-striped align-middle mb-0 text-nowrap">
          <thead className="table-dark text-center">
            <tr>
              <th>Sr No.</th>
              <th>Task Name</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Description</th>
              <th>Image</th>
              {role === "admin" && (
                <>
                  <th>Designation</th>
                  <th>Created By</th>
                </>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(task) && task.length > 0 ? (
              task.map((taskItem, index) => (
                <tr key={taskItem._id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="text-start">{taskItem.name}</td>
                  <td>{taskItem.project?.projectname || 'N/A'}</td>
                  <td className="text-start">
                    {taskItem.assignedTo.length === 0 ? (
                      'N/A'
                    ) : taskItem.assignedTo.length === 1 ? (
                      `${taskItem.assignedTo[0].firstName} ${taskItem.assignedTo[0].lastName}`
                    ) : (
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          {taskItem.assignedTo[0].firstName} {taskItem.assignedTo[0].lastName} +{taskItem.assignedTo.length - 1}
                        </button>
                        <ul className="dropdown-menu">
                          {taskItem.assignedTo.map((user, idx) => (
                            <li key={idx}>
                              <span className="dropdown-item">
                                {user.firstName} {user.lastName}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`badge bg-${taskItem.priority === 'high' ? 'danger' : taskItem.priority === 'medium' ? 'warning' : 'secondary'}`}>
                      {taskItem.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${taskItem.status === 'completed' ? 'success' : taskItem.status === 'in progress' ? 'primary' : 'info'}`}>
                      {taskItem.status}
                    </span>
                  </td>
                  <td>{new Date(taskItem.dueDate).toLocaleDateString()}</td>
                  <td className="text-start">{taskItem.description || 'N/A'}</td>
                  <td>
                    {taskItem.attachments ? (
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() =>
                          window.open(`${IMAGE_BASE_URL}/uploads/${taskItem.attachments}`, '_blank')
                        }
                      >
                        View
                      </button>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  {role === "admin" && (
                    <>
                      <td className="text-start">{taskItem.designation || 'N/A'}</td>
                      <td className="text-start">
                        {taskItem.createdBy ? `${taskItem.createdBy.firstName} ${taskItem.createdBy.lastName}` : 'N/A'}
                      </td>
                    </>
                  )}
                  <td>
                    {role === "admin" ? (
                      <>
                        <button onClick={() => navigate(`/update-task/${taskItem._id}`)} className="btn btn-sm btn-warning me-2">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(taskItem._id)} className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => 
                          navigate(`/update-status/${taskItem._id}`)
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 12 : 10} className="text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTask;
