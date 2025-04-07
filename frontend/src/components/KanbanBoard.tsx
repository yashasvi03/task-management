import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Task, TaskStatus } from '../types/task';
import { formatDate, isTaskOverdue } from '../utils/dateUtils';
import * as taskService from '../services/taskService';
import { PriorityBadge } from '../styles/StyledComponents';
import { useNavigate } from 'react-router-dom';

// Styled components for the Kanban board
const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 20px;
  height: calc(100vh - 180px);
  overflow-x: auto;
  padding: 0 20px 20px 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Column = styled.div`
  background-color: #f5f7fa;
  border-radius: 12px;
  width: 340px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ColumnHeader = styled.div<{ $color: string }>`
  padding: 18px 20px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: ${props => props.$color};
  color: white;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  }
`;

const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ColumnActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TaskCount = styled.span`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
`;

const TaskList = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const TaskCard = styled.div<{ $isDragging?: boolean }>`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: ${props => props.$isDragging 
    ? '0 8px 16px rgba(0, 0, 0, 0.1)' 
    : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #4a90e2;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TaskTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

const TaskDate = styled.span<{ $isOverdue: boolean }>`
  color: ${props => props.$isOverdue ? '#e74c3c' : '#666'};
  font-weight: ${props => props.$isOverdue ? '500' : 'normal'};
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const AddTaskButton = styled.button`
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  justify-content: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' | 'danger' }>`
  background-color: ${props => {
    switch (props.$variant) {
      case 'primary':
        return '#4a90e2';
      case 'secondary':
        return '#f5f5f5';
      case 'danger':
        return '#e74c3c';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => props.$variant === 'secondary' ? '#333' : 'white'};
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

interface KanbanBoardProps {
  onTaskUpdate: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onTaskUpdate }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleMoveTask = async (taskId: number, newStatus: TaskStatus) => {
    try {
      // Update the task in the backend
      await taskService.updateTask(taskId, { status: newStatus });
      
      // Update the local state
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      
      setTasks(updatedTasks);
      onTaskUpdate();
    } catch (err) {
      console.error('Error updating task status:', err);
      // Revert the UI if the update fails
      fetchTasks();
    }
  };
  
  const handleCreateTask = (status: TaskStatus) => {
    navigate('/tasks/new', { state: { defaultStatus: status, statusLocked: true } });
  };
  
  const handleEditTask = (taskId: number) => {
    navigate(`/tasks/edit/${taskId}`);
  };
  
  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === TaskStatus.TODO);
  const inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
  const doneTasks = tasks.filter(task => task.status === TaskStatus.DONE);
  
  if (loading) {
    return <div>Loading tasks...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const renderTaskCard = (task: Task) => {
    const moveButtons = [];
    
    if (task.status !== TaskStatus.TODO) {
      moveButtons.push(
        <ActionButton 
          key="move-to-todo" 
          $variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            handleMoveTask(task.id, TaskStatus.TODO);
          }}
        >
          Move to Todo
        </ActionButton>
      );
    }
    
    if (task.status !== TaskStatus.IN_PROGRESS) {
      moveButtons.push(
        <ActionButton 
          key="move-to-in-progress" 
          $variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            handleMoveTask(task.id, TaskStatus.IN_PROGRESS);
          }}
        >
          Move to In Progress
        </ActionButton>
      );
    }
    
    if (task.status !== TaskStatus.DONE) {
      moveButtons.push(
        <ActionButton 
          key="move-to-done" 
          $variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleMoveTask(task.id, TaskStatus.DONE);
          }}
        >
          Move to Done
        </ActionButton>
      );
    }
    
    return (
      <TaskCard key={task.id} onClick={() => handleEditTask(task.id)}>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>
          {task.description || 'No description provided.'}
        </TaskDescription>
        <BadgeContainer>
          <PriorityBadge $priority={task.priority}>
            {task.priority}
          </PriorityBadge>
        </BadgeContainer>
        <TaskFooter>
          <TaskDate $isOverdue={isTaskOverdue(task.dueDate)}>
            {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
          </TaskDate>
        </TaskFooter>
        <ActionButtons>
          {moveButtons}
        </ActionButtons>
      </TaskCard>
    );
  };
  
  return (
    <BoardContainer>
      {/* TODO Column */}
      <Column>
        <ColumnHeader $color="#3498db">
          <ColumnTitle>
            To Do
            <TaskCount>{todoTasks.length}</TaskCount>
          </ColumnTitle>
          <ColumnActions>
            <AddTaskButton onClick={() => handleCreateTask(TaskStatus.TODO)}>
              + Add
            </AddTaskButton>
          </ColumnActions>
        </ColumnHeader>
        <TaskList>
          {todoTasks.map(renderTaskCard)}
        </TaskList>
      </Column>
      
      {/* IN PROGRESS Column */}
      <Column>
        <ColumnHeader $color="#f39c12">
          <ColumnTitle>
            In Progress
            <TaskCount>{inProgressTasks.length}</TaskCount>
          </ColumnTitle>
          <ColumnActions>
            <AddTaskButton onClick={() => handleCreateTask(TaskStatus.IN_PROGRESS)}>
              + Add
            </AddTaskButton>
          </ColumnActions>
        </ColumnHeader>
        <TaskList>
          {inProgressTasks.map(renderTaskCard)}
        </TaskList>
      </Column>
      
      {/* DONE Column */}
      <Column>
        <ColumnHeader $color="#2ecc71">
          <ColumnTitle>
            Done
            <TaskCount>{doneTasks.length}</TaskCount>
          </ColumnTitle>
          <ColumnActions>
            <AddTaskButton onClick={() => handleCreateTask(TaskStatus.DONE)}>
              + Add
            </AddTaskButton>
          </ColumnActions>
        </ColumnHeader>
        <TaskList>
          {doneTasks.map(renderTaskCard)}
        </TaskList>
      </Column>
    </BoardContainer>
  );
};

export default KanbanBoard;
