import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const task = await taskService.getTaskById(id);
    
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

export const getTodayTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getTodayTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching today\'s tasks:', error);
    res.status(500).json({ message: 'Failed to fetch today\'s tasks' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, status, priority } = req.body;
    
    // Basic validation
    if (!title) {
      res.status(400).json({ message: 'Title is required' });
      return;
    }
    
    // Parse dueDate if it's a string
    let parsedDueDate = dueDate;
    if (dueDate && typeof dueDate === 'string') {
      parsedDueDate = new Date(dueDate);
    }
    
    const newTask = await taskService.createTask({
      title,
      description,
      dueDate: parsedDueDate,
      status,
      priority
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, dueDate, status, priority } = req.body;
    
    // Check if task exists
    const existingTask = await taskService.getTaskById(id);
    if (!existingTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    // Parse dueDate if it's a string
    let parsedDueDate = dueDate;
    if (dueDate && typeof dueDate === 'string') {
      parsedDueDate = new Date(dueDate);
    }
    
    const updatedTask = await taskService.updateTask(id, {
      title,
      description,
      dueDate: parsedDueDate,
      status,
      priority
    });
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    // Check if task exists
    const existingTask = await taskService.getTaskById(id);
    if (!existingTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    await taskService.deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
