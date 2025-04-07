export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null; // ISO date string
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: string | null; // ISO date string
  status?: TaskStatus;
  priority?: TaskPriority;
}
