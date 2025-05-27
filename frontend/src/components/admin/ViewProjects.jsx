import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { viewProjects } from '../redux/slice/addUsersAdmin';

const ViewProjects = () => {
    const dispatch = useDispatch()
    const { projects } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(viewProjects());
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">All Projects</h3>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Sr no.</th>
                            <th>Project Name</th>
                            <th>Client</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((proj, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{proj.projectname}</td>
                                <td>{proj.description}</td>
                                <td>
                                    <span className={`badge bg-${proj.priority === 'High' ? 'danger' : proj.priority === 'Medium' ? 'warning' : 'secondary'}`}>
                                        {proj.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge bg-${proj.status === 'Active' ? 'success' : proj.status === 'Completed' ? 'primary' : 'info'}`}>
                                        {proj.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2">View</button>
                                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewProjects
