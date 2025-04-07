import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import TaskItem from './TaskItem';
import {
  Container,
  PageTitle,
  EmptyState,
  PrimaryButton,
  Select,
  FormGroup,
  Label
} from '../styles/StyledComponents';
import * as taskService from '../services/taskService';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterGroup = styled(FormGroup)`
  flex: 1;
  min-width: 200px;
  margin-bottom: 0;
`;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  
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
  
  const handleTaskDeleted = () => {
    fetchTasks();
  };
  
  const handleCreateTask = () => {
    navigate('/tasks/new');
  };
  
  const filteredTasks = tasks
    .filter(task => {
      if (statusFilter === 'ALL') return true;
      return task.status === statusFilter;
    })
    .filter(task => {
      if (priorityFilter === 'ALL') return true;
      return task.priority === priorityFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { 
            [TaskPriority.HIGH]: 0, 
            [TaskPriority.MEDIUM]: 1, 
            [TaskPriority.LOW]: 2 
          };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          const statusOrder = { 
            [TaskStatus.TODO]: 0, 
            [TaskStatus.IN_PROGRESS]: 1, 
            [TaskStatus.DONE]: 2 
          };
          return statusOrder[a.status] - statusOrder[b.status];
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  
  if (loading) {
    return <Container>Loading tasks...</Container>;
  }
  
  if (error) {
    return <Container>Error: {error}</Container>;
  }
  
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <PageTitle>All Tasks</PageTitle>
        <PrimaryButton onClick={handleCreateTask}>Create New Task</PrimaryButton>
      </div>
      
      <FilterContainer>
        <FilterGroup>
          <Label>Status</Label>
          <Select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value={TaskStatus.TODO}>{TaskStatus.TODO}</option>
            <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
            <option value={TaskStatus.DONE}>{TaskStatus.DONE}</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <Label>Priority</Label>
          <Select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value={TaskPriority.HIGH}>{TaskPriority.HIGH}</option>
            <option value={TaskPriority.MEDIUM}>{TaskPriority.MEDIUM}</option>
            <option value={TaskPriority.LOW}>{TaskPriority.LOW}</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <Label>Sort By</Label>
          <Select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="createdAt">Created Date</option>
          </Select>
        </FilterGroup>
      </FilterContainer>
      
      {filteredTasks.length === 0 ? (
        <EmptyState>
          <h3>No tasks found</h3>
          <p>There are no tasks matching your filters or you haven't created any tasks yet.</p>
          <PrimaryButton onClick={handleCreateTask}>Create Your First Task</PrimaryButton>
        </EmptyState>
      ) : (
        filteredTasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onTaskDeleted={handleTaskDeleted} 
          />
        ))
      )}
    </Container>
  );
};

export default TaskList;
