import pool from '../db'; // Assuming you’ll use pg Pool in future

// Local type definitions
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: Date;
  priority?: number;
  status?: Status;
  label?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: Date;
  status?: Status;
  priority?: Priority;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: Date | null;
  status?: Status;
  priority?: Priority;
}

// ⚠️ These below functions still assume you’re using Prisma.
// If you're NOT, you’ll need to rewrite them using raw SQL and `pool.query`.

export const getAllTasks = async (): Promise<Task[]> => {
  throw new Error('Not implemented - requires Prisma or raw SQL setup');
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  throw new Error('Not implemented - requires Prisma or raw SQL setup');
};

export const getTodayTasks = async (): Promise<Task[]> => {
  throw new Error('Not implemented - requires Prisma or raw SQL setup');
};

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  throw new Error('Not implemented - requires Prisma or raw SQL setup');
};

export const updateTask = async (id: number, data: UpdateTaskDto): Promise<Task> => {
  throw new Error('Not implemented - requires Prisma or raw SQL setup');
};

export const deleteTask = async (id: number): Promise<Task> => {
  throw new Error('Not implemented - requires Prisma or raw SQL setup');
};
