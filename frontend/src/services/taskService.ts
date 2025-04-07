import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

const API_URL = 'http://localhost:5000/api/tasks';

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/${id}`);
  return response.data;
};

export const getTodayTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/today/tasks`);
  return response.data;
};

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: UpdateTaskDto): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
