import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskStatus } from '../types/task';
import TaskItem from './TaskItem';
import {
  Container,
  PageTitle,
  EmptyState,
  PrimaryButton,
  DashboardGrid,
  DashboardCard,
  DashboardCardTitle,
  DashboardCardContent,
  StatNumber,
  StatLabel,
  ProgressContainer,
  ProgressBar,
  TodayTasksSection,
  SectionHeader
} from '../styles/StyledComponents';
import * as taskService from '../services/taskService';
import { isTaskDueToday } from '../utils/dateUtils';
import { 
  FiCheckCircle, 
  FiClock, 
  FiList, 
  FiPieChart, 
  FiCalendar, 
  FiActivity,
  FiPlus
} from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all tasks
      const allTasks = await taskService.getAllTasks();
      setTasks(allTasks);
      
      // Fetch today's tasks
      const todayTasksData = await taskService.getTodayTasks();
      setTodayTasks(todayTasksData);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to fetch dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleTaskDeleted = () => {
    fetchData();
  };
  
  const handleCreateTask = () => {
    navigate('/tasks/new');
  };
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === TaskStatus.DONE).length;
  const inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length;
  const pendingTasks = tasks.filter(task => task.status === TaskStatus.TODO).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  if (loading) {
    return <Container>Loading dashboard...</Container>;
  }
  
  if (error) {
    return <Container>Error: {error}</Container>;
  }
  
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <PageTitle>Dashboard</PageTitle>
        <PrimaryButton onClick={handleCreateTask}>
          <FiPlus style={{ marginRight: '5px' }} /> Create New Task
        </PrimaryButton>
      </div>
      
      <DashboardGrid>
        <DashboardCard $accentColor="#4a90e2">
          <DashboardCardTitle>
            <FiList /> Total Tasks
          </DashboardCardTitle>
          <DashboardCardContent>
            <StatNumber>{totalTasks}</StatNumber>
            <StatLabel>Tasks in your system</StatLabel>
          </DashboardCardContent>
        </DashboardCard>
        
        <DashboardCard $accentColor="#2ecc71">
          <DashboardCardTitle>
            <FiCheckCircle /> Completed
          </DashboardCardTitle>
          <DashboardCardContent>
            <StatNumber>{completedTasks}</StatNumber>
            <StatLabel>Tasks completed</StatLabel>
          </DashboardCardContent>
        </DashboardCard>
        
        <DashboardCard $accentColor="#f39c12">
          <DashboardCardTitle>
            <FiClock /> In Progress
          </DashboardCardTitle>
          <DashboardCardContent>
            <StatNumber>{inProgressTasks}</StatNumber>
            <StatLabel>Tasks in progress</StatLabel>
          </DashboardCardContent>
        </DashboardCard>
        
        <DashboardCard $accentColor="#3498db">
          <DashboardCardTitle>
            <FiList /> Pending
          </DashboardCardTitle>
          <DashboardCardContent>
            <StatNumber>{pendingTasks}</StatNumber>
            <StatLabel>Tasks pending</StatLabel>
          </DashboardCardContent>
        </DashboardCard>
        
        <DashboardCard $accentColor="#9b59b6">
          <DashboardCardTitle>
            <FiPieChart /> Completion Rate
          </DashboardCardTitle>
          <DashboardCardContent>
            <StatNumber>{completionRate}<span>%</span></StatNumber>
            <StatLabel>Of all tasks</StatLabel>
            <ProgressContainer>
              <ProgressBar $percentage={completionRate} $color="#9b59b6" />
            </ProgressContainer>
          </DashboardCardContent>
        </DashboardCard>
        
        <DashboardCard $accentColor="#e74c3c">
          <DashboardCardTitle>
            <FiCalendar /> Due Today
          </DashboardCardTitle>
          <DashboardCardContent>
            <StatNumber>{todayTasks.length}</StatNumber>
            <StatLabel>Tasks due today</StatLabel>
          </DashboardCardContent>
        </DashboardCard>
      </DashboardGrid>
      
      <TodayTasksSection>
        <SectionHeader>
          <h2><FiCalendar /> Today's Tasks</h2>
        </SectionHeader>
        
        {todayTasks.length === 0 ? (
          <EmptyState>
            <h3>No tasks due today</h3>
            <p>You don't have any tasks due today. Enjoy your day!</p>
          </EmptyState>
        ) : (
          todayTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskDeleted={handleTaskDeleted} 
            />
          ))
        )}
      </TodayTasksSection>
    </Container>
  );
};

export default Dashboard;
