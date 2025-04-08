import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

// ✅ This will correctly read the env var
//const API_URL = `${process.env.REACT_APP_API_URL}/api/tasks`;

const API_URL = 'https://task-management-backend-production-b066.up.railway.app/api/tasks';


console.log("API_URL:", API_URL);

// ✅ All Tasks
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    console.log("✅ getAllTasks response:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("🔥 getAllTasks error:", error);
    return [];
  }
};

// ✅ Task by ID
export const getTaskById = async (id: number): Promise<Task> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✅ Today's Tasks
export const getTodayTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/today/tasks`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("🔥 getTodayTasks error:", error);
    return [];
  }
};

// ✅ Create Task
export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// ✅ Update Task
export const updateTask = async (id: number, task: UpdateTaskDto): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

// ✅ Delete Task
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
