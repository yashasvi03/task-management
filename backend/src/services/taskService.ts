import prisma from '../config/db';
import { Prisma, Task, Status, Priority } from '@prisma/client';

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

export const getAllTasks = async (): Promise<Task[]> => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const getTodayTasks = async (): Promise<Task[]> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return prisma.task.findMany({
    where: {
      dueDate: {
        gte: today,
        lt: tomorrow,
      },
    },
    orderBy: {
      priority: 'desc',
    },
  });
};

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  return prisma.task.create({
    data,
  });
};

export const updateTask = async (id: number, data: UpdateTaskDto): Promise<Task> => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id: number): Promise<Task> => {
  return prisma.task.delete({
    where: { id },
  });
};
