import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, viewTaskDetails } from '../../redux/slice/taskSlice';
import { handleError, handleSuccess } from '../../utils/Error';

const ViewTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.tasks);  

  useEffect(() => {
    dispatch(viewTaskDetails());
  }, [dispatch]);

       const handleDelete = async (id) => {        
            try {
              const response = await dispatch(deleteTask({id})).unwrap();          
              handleSuccess(response.message);
              setTimeout(() => navigate("/admin"), 1000);
            } catch (err) {
              handleError(err);
            }
        }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">All Tasks</h4>
        <button onClick={() => navigate("/create-task")} className="btn btn-sm btn-primary">
          + New Task
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #dee2e6' }}>
        <table className="table table-bordered table-striped align-middle mb-0 text-nowrap">
          <thead className="table-dark">
            <tr className="text-center">
              <th style={{ width: '3%' }}>Sr no.</th>
              <th style={{ width: '12%' }}>Task Name</th>
              <th style={{ width: '10%' }}>Project</th>
              <th style={{ width: '13%' }}>Assigned To</th>
              <th style={{ width: '10%' }}>Designation</th>
              <th style={{ width: '10%' }}>Priority</th>
              <th style={{ width: '10%' }}>Status</th>
              <th style={{ width: '10%' }}>Due Date</th>
              <th style={{ width: '15%' }}>Description</th>
              <th style={{ width: '12%' }}>Images</th>
              <th style={{ width: '10%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {task.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">No tasks found</td>
              </tr>
            ) : (
              task.map((task, index) => (
                <tr key={task._id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="text-start">{task.name}</td>
                  <td>{task.project?.projectname || 'N/A'}</td>
                  <td className="text-start">
                    {task.assignedTo.length === 0 ? (
                      'N/A'
                    ) : task.assignedTo.length === 1 ? (
                      `${task.assignedTo[0].firstName} ${task.assignedTo[0].lastName}`
                    ) : (
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {task.assignedTo[0].firstName} {task.assignedTo[0].lastName} +{task.assignedTo.length - 1}
                        </button>
                        <ul className="dropdown-menu">
                          {task.assignedTo.map((user, index) => (
                            <li key={index}>
                              <span className="dropdown-item">
                                {user.firstName} {user.lastName}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                  <td className="text-start">{task.designation || 'N/A'}</td>
                  <td>
                    <span className={`badge bg-${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'secondary'}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'primary' : 'info'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="text-start" style={{ whiteSpace: 'normal' }}>
                    {task.description || 'N/A'}
                  </td>
                  <td className="text-center">
                    {task.attachments}
                  </td>
                  <td>
                    <button onClick={() => navigate(`/edit-task/${task._id}`)} className="btn btn-sm btn-warning me-2">Edit</button>
                    <button onClick={()=>handleDelete(task._id)}  className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTask;
