import axios from 'axios';
import 'carbon-components/css/carbon-components.min.css';
import React, { useEffect, useState } from 'react';
import "./EmployeeDetails.scss";
import BackToHome from '../Home/Back/BackToHome'; // Assuming you have this component
import Employee from './Model/Employee'
interface Project {
    projectId: number;
    projectName: string;
}


const EmployeeDetails: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    // Fetch the list of projects when the component mounts
    useEffect(() => {
        axios.get('http://localhost:9000/project')
            .then(response => {
                setProjects(response.data); // Assuming response is an array of projects
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    // Fetch the list of employees when a project is selected
    useEffect(() => {
        if (selectedProjectId !== null) {
            axios.get(`http://localhost:9000/project/${selectedProjectId}/employee/`)
                .then(response => {
                    setEmployees(response.data); // Assuming response is an array of employees
                })
                .catch(error => {
                    console.error(`Error fetching employees for project ${selectedProjectId}:`, error);
                });
        }
    }, [selectedProjectId]);

    // Handle project selection change
    const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProjectId(event.target.value);
    };

    return (
        <div className="app-container">
            <div className="carbon-table-wrapper">
                <h1>Employee Details</h1>

                {/* Project Dropdown */}
                <div className='dropdown-container'>
                    <label htmlFor="projectSelect">Select Project: </label>
                    <select id="projectSelect" onChange={handleProjectChange}>
                        <option value="">-- Select a Project --</option>
                        {projects.map((project) => (
                            <option key={project.projectId} value={project.projectId}>
                                {project.projectName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Employee List */}
                {selectedProjectId && employees.length > 0 ? (
                    <div>
                        <h2>Employee List for Project {selectedProjectId}</h2>
                        <table className="employee-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Employee Name</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Project Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.employeeId}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.employeeId}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.employeeName}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : selectedProjectId ? (
                    <p>No employees found for the selected project.</p>
                ) : (
                    <p>Please select a project.</p>
                )}
                <BackToHome />
            </div>
            
        </div>
    );
};

export default EmployeeDetails;
