import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewTask } from '../../redux/slice/taskSlice';
import { handleError, handleSuccess } from '../../../utils/Error';

const CreateTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        taskname: '',
        projects: '',
        description: '',
        priority: '',
        status: '',
        designation: '',
        assignedTo: [],
        dueDate: '',
        attachments: null,
    });

    console.log(formData, "formData");
    const { projects } = useSelector((state) => state.admin);
    console.log(projects,"projects");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(createNewTask(formData)).unwrap();
            handleSuccess(response.message);
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="container mt-3">
            <h4>Create New Task</h4>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Task Name</label>
                        <input type="text" class="form-control" name="name" value={formData.taskname} onChange={(e) => setFormData({ ...formData, taskname: e.target.value })} placeholder="Task Name" />

                    </div>
                    <div className="col-md-6">
                        <label class="form-label">Designation</label>
                        <select
                            className="form-control"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            required
                        >
                            <option>-- Select Designation --</option>
                            <option value="developer">Developer</option>
                            <option value="tester">Tester</option>
                            <option value="designer">Designer</option>
                        </select>
                    </div>
                    <div class="form-group mb-3">
                        <label className="form-label">Project</label>
                        <select name="designation" className="form-select" value={formData.projects} onChange={(e) => setFormData({ ...formData, projects: e.target.value })} required>
                            <option value="">Select Project</option>
                            {projects.map((project,index) => (
                                // console.log(project,"proj")
                                // console.log(_id,"_id")
                                <option key={index} value={project._id}>{project.projectname}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label class="form-label">Priority</label>
                        <select
                            className="form-control"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            required
                        >
                            <option>-- Select Priority --</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Status</label>
                        <select
                            className="form-control"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            required
                        >
                            <option>-- Select Status --</option>
                            <option value="active">Active</option>
                            <option value="hold">Hold</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label className="form-label">Assign To</label>
                        <select name="assign" className="form-select" value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} required>
                            <option value="">--Assign to--</option>
                            {projects.map((project, index) => (
                                <option key={index} value={project}>{project.projectname}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            className="form-control"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Attachments</label>
                        <input
                            type="file"
                            name="attachments"
                            className="form-control"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData({ ...formData, attachments: file });
                            }}
                        />
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Description</label>
                    <textarea type="text" class="form-control" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" />
                </div>
                <button type="submit" className="btn btn-success mt-3">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
