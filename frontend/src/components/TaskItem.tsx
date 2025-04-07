import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/task';
import { formatDate } from '../utils/dateUtils';
import { isTaskOverdue } from '../utils/dateUtils';
import {
  TaskCard,
  TaskHeader,
  TaskTitle,
  TaskDescription,
  TaskFooter,
  TaskDate,
  TaskActions,
  StatusBadge,
  PriorityBadge,
  SecondaryButton,
  DangerButton
} from '../styles/StyledComponents';
import * as taskService from '../services/taskService';
import { 
  FiEdit2, 
  FiTrash2, 
  FiCalendar, 
  FiClock 
} from 'react-icons/fi';

interface TaskItemProps {
  task: Task;
  onTaskDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted }) => {
  const navigate = useNavigate();
  const isOverdue = isTaskOverdue(task.dueDate);
  
  const handleEdit = () => {
    navigate(`/tasks/edit/${task.id}`);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(task.id);
        onTaskDeleted();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };
  
  return (
    <TaskCard>
      <TaskHeader>
        <TaskTitle>{task.title}</TaskTitle>
        <div style={{ display: 'flex', gap: '10px' }}>
          <StatusBadge $status={task.status}>{task.status}</StatusBadge>
          <PriorityBadge $priority={task.priority}>{task.priority}</PriorityBadge>
        </div>
      </TaskHeader>
      
      <TaskDescription>
        {task.description || 'No description provided.'}
      </TaskDescription>
      
      <TaskFooter>
        <TaskDate $isOverdue={isOverdue}>
          {task.dueDate ? (
            <>
              <FiCalendar style={{ marginRight: '5px' }} />
              {formatDate(task.dueDate)}
            </>
          ) : (
            <>
              <FiClock style={{ marginRight: '5px' }} />
              No due date
            </>
          )}
        </TaskDate>
        
        <TaskActions>
          <SecondaryButton onClick={handleEdit}>
            <FiEdit2 style={{ marginRight: '5px' }} /> Edit
          </SecondaryButton>
          <DangerButton onClick={handleDelete}>
            <FiTrash2 style={{ marginRight: '5px' }} /> Delete
          </DangerButton>
        </TaskActions>
      </TaskFooter>
    </TaskCard>
  );
};

export default TaskItem;
