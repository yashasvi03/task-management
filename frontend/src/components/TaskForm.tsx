import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TaskStatus, TaskPriority, CreateTaskDto, UpdateTaskDto } from '../types/task';
import {
  Container,
  PageTitle,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  PrimaryButton,
  SecondaryButton
} from '../styles/StyledComponents';
import * as taskService from '../services/taskService';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: flex-end;
`;

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;
  
  // Get default status and statusLocked from location state if available
  const defaultStatus = location.state?.defaultStatus || TaskStatus.TODO;
  const statusLocked = location.state?.statusLocked || false;
  
  const [formData, setFormData] = useState<CreateTaskDto | UpdateTaskDto>({
    title: '',
    description: '',
    dueDate: '',
    status: defaultStatus,
    priority: TaskPriority.MEDIUM
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isEditMode) {
      fetchTask();
    }
  }, [id]);
  
  const fetchTask = async () => {
    try {
      setLoading(true);
      const task = await taskService.getTaskById(Number(id));
      
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '', // Format date for input
        status: task.status,
        priority: task.priority
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching task:', err);
      setError('Failed to fetch task details. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await taskService.updateTask(Number(id), formData as UpdateTaskDto);
      } else {
        await taskService.createTask(formData as CreateTaskDto);
      }
      
      navigate('/tasks');
    } catch (err) {
      console.error('Error saving task:', err);
      setError('Failed to save task. Please try again.');
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/tasks');
  };
  
  if (loading && isEditMode) {
    return <Container>Loading task details...</Container>;
  }
  
  return (
    <Container>
      <PageTitle>{isEditMode ? 'Edit Task' : 'Create New Task'}</PageTitle>
      
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate || ''}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="status">
            Status {statusLocked && <span style={{ color: '#666', fontSize: '14px' }}>(Locked by column selection)</span>}
          </Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={statusLocked}
            style={statusLocked ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
          >
            <option value={TaskStatus.TODO}>{TaskStatus.TODO}</option>
            <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
            <option value={TaskStatus.DONE}>{TaskStatus.DONE}</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value={TaskPriority.LOW}>{TaskPriority.LOW}</option>
            <option value={TaskPriority.MEDIUM}>{TaskPriority.MEDIUM}</option>
            <option value={TaskPriority.HIGH}>{TaskPriority.HIGH}</option>
          </Select>
        </FormGroup>
        
        <ButtonGroup>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
          </PrimaryButton>
          <SecondaryButton type="button" onClick={handleCancel}>
            Cancel
          </SecondaryButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default TaskForm;
