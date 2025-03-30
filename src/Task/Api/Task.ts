interface Task {
    taskId: number;
    taskName: string;
    taskStartDate: string;
    taskEnddate: string;
    projectId: string;
    employeesAssigned: string[]
  }

export default Task