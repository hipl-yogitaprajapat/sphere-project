import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, viewProjects } from '../redux/slice/addUsersAdmin';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils/Error';

const ViewProjects = () => {  
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { projects } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(viewProjects());
    }, [dispatch]);

       const handleDelete = async (id) => {        
            try {
              const response = await dispatch(deleteProject({id})).unwrap();          
              handleSuccess(response.message);
              setTimeout(() => navigate("/admin"), 1000);
            } catch (err) {
              handleError(err);
            }
        }

    return (
        <div className="container mt-2">
            <div className='page-block d-flex justify-content-between align-items-center'>
              <h4 className="mb-4 ">All Projects</h4>
                <button onClick={()=>navigate("/create-project")} className="btn btn-sm btn-primary">
                + New Project
              </button>
            </div>
          
            <div className="table-responsive" style={{ border: '1px solid #dee2e6' }}>
                <table className="table table-striped table-bordered" style={{ tableLayout: 'fixed', width: '100%', marginBottom: 0 }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '5%' }}>Sr no.</th>
                            <th style={{ width: '20%' }}>Project Name</th>
                            <th style={{ width: '30%' }}>Description</th>
                            <th style={{ width: '15%' }}>Priority</th>
                            <th style={{ width: '15%' }}>Status</th>
                            <th style={{ width: '15%' }}>Actions</th>
                        </tr>
                    </thead>
                </table>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <tbody>
                            {projects.map((proj, index) => (
                                <tr key={index}>
                                    <td style={{ width: '5%' }}>{index + 1}</td>
                                    <td style={{ width: '20%' }}>{proj.projectname}</td>
                                    <td style={{ width: '30%' }}>{proj.description}</td>
                                    <td style={{ width: '15%' }}>
                                        <span className={`badge bg-${proj.priority === 'High' ? 'danger' : proj.priority === 'Medium' ? 'warning' : 'secondary'}`}>
                                            {proj.priority}
                                        </span>
                                    </td>
                                    <td style={{ width: '15%' }}>
                                        <span className={`badge bg-${proj.status === 'Active' ? 'success' : proj.status === 'Completed' ? 'primary' : 'info'}`}>
                                            {proj.status}
                                        </span>
                                    </td>
                                    <td style={{ width: '15%' }}>
                                        <button onClick={()=>navigate(`/edit-project/${proj._id}`)} className="btn btn-sm btn-warning me-2">Edit</button>
                                        <button onClick={()=>handleDelete(proj._id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewProjects;
