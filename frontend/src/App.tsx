import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4ecfb 100%);
`;

const App: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  
  const handleTaskUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard key={refreshTrigger} />} />
          <Route path="/tasks" element={<TaskList key={refreshTrigger} />} />
          <Route path="/board" element={<KanbanBoard onTaskUpdate={handleTaskUpdate} />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/edit/:id" element={<TaskForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
