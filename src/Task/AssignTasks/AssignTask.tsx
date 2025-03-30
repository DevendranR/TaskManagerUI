import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignTask.scss'; // Custom styling for your component
import Select from 'react-select';
import { MultiValue } from 'react-select';
import Employee from 'Employee/Model/Employee';
import Task from '../Api/Task';

const AssignTask: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]); // Assuming your backend returns an array of projects
  const [employees, setEmployees] = useState<Employee[]>([]); // Assuming your backend returns an array of projects
  const [employeesAssigned, setEmployeesAssigned] = useState<string[]>([]); // Assuming your backend returns an array of projects

  // Fetch projects for the dropdown when the component mounts
  useEffect(() => {
    axios.get('http://localhost:9000/project')
      .then(response => {
        setProjects(response.data); // Assuming the response is an array of projects
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      axios.get(`http://localhost:9000/project/${selectedProjectId}/employee/`)
        .then(response => {
          setEmployees(response.data); // Assuming the response is an array of employees
        })
        .catch(error => {
          console.error('Error fetching employees for project:', error);
        });
    }
  }, [selectedProjectId]);


  // Handle form field changes
  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value);
  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProjectId(e.target.value);
  const handleSelectChange = (selectedOptions: MultiValue<{ value: string, label: string }> | null) => {
  const selectedValues = selectedOptions
      ? selectedOptions.map(option => option.value)
      : [];
    setEmployeesAssigned(selectedValues);
  };
  const handleSubmit = () => {
    // Create the task object
    const task: Task = {
      taskId:123,
      taskName,
      taskStartDate: startDate,
      taskEnddate: endDate,
      projectId: selectedProjectId!,
      employeesAssigned:employeesAssigned
    };

    // Call the API to assign the task
    axios.post('http://localhost:9000/task/', task)
      .then(response => {
        console.log('Task assigned successfully:', response.data);
        // Reset the form or provide feedback
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  };

  // Helper function to format the date in dd-MM-yyyy format
  const formatDate = (dateString: string): string => {
    if (dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    }
    return '';
  };

  // Handle date picker changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(formatDate(e.target.value)); // Accepts Date or null
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(formatDate(e.target.value)); // Accepts Date or null
  };
  const employeeOptions = employees.map((employee) => ({
    value: String(employee.employeeId), // You can set the value as employeeName
    label: employee.employeeName, // Display employeeName as the label
  }));
  return (
    <div className="assign-task-form">
      <h1>Assign Task</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {/* Task Name */}
        <div className="form-group">
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleTaskNameChange}
            placeholder="Enter Task Name"
            required
          />
        </div>

        {/* Project Dropdown */}
        <div className="form-group">
          <label htmlFor="projectSelect">Select Project</label>
          <select id="projectSelect" onChange={handleProjectChange} value={selectedProjectId || ''} required>
            <option value="">-- Select a Project --</option>
            {projects.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="employeesAssigned">Project Team</label>
          <Select
          isMulti
          name="employees"
          options={employeeOptions}
          onChange={handleSelectChange}
          placeholder="Select Employees"
        />
        </div>

        
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="start-date" name="start-date" required onChange={handleStartDateChange}/>
        </div>

        
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input type="date" id="end-date" name="end-date" required onChange={handleEndDateChange}/>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="btn-assign-task">Assign Task</button>
        </div>
      </form>
    </div>
  );
};

export default AssignTask;
