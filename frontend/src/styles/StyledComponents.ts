import styled from 'styled-components';
import { TaskPriority, TaskStatus } from '../types/task';

// Layout components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
`;

// Form components
export const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const inputStyles = `
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 120px;
  resize: vertical;
`;

export const Select = styled.select`
  ${inputStyles}
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 40px;
`;

// Button components
export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: #4a90e2;
  color: white;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #d73c2c;
  }
`;

// Task components
export const TaskCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border-left: 4px solid #4a90e2;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(74, 144, 226, 0) 100%);
    border-radius: 0 0 0 100%;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const TaskTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const TaskDescription = styled.p`
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

export const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
`;

export const TaskDate = styled.span<{ $isOverdue?: boolean }>`
  color: ${props => props.$isOverdue ? '#e74c3c' : '#666'};
  font-weight: ${props => props.$isOverdue ? '500' : 'normal'};
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const StatusBadge = styled.span<{ $status: TaskStatus }>`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.$status) {
      case TaskStatus.TODO:
        return `
          background-color: #f8f9fa;
          color: #6c757d;
          border: 1px solid #dee2e6;
        `;
      case TaskStatus.IN_PROGRESS:
        return `
          background-color: #e3f2fd;
          color: #1976d2;
          border: 1px solid #bbdefb;
        `;
      case TaskStatus.DONE:
        return `
          background-color: #e8f5e9;
          color: #388e3c;
          border: 1px solid #c8e6c9;
        `;
      default:
        return '';
    }
  }}
`;

export const PriorityBadge = styled.span<{ $priority: TaskPriority }>`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.$priority) {
      case TaskPriority.LOW:
        return `
          background-color: #f5f5f5;
          color: #757575;
          border: 1px solid #e0e0e0;
        `;
      case TaskPriority.MEDIUM:
        return `
          background-color: #fff8e1;
          color: #ffa000;
          border: 1px solid #ffecb3;
        `;
      case TaskPriority.HIGH:
        return `
          background-color: #fbe9e7;
          color: #d84315;
          border: 1px solid #ffccbc;
        `;
      default:
        return '';
    }
  }}
`;

// Dashboard components
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

export const DashboardCard = styled.div<{ $accentColor?: string }>`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-top: ${props => props.$accentColor ? `4px solid ${props.$accentColor}` : 'none'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.$accentColor || 'linear-gradient(90deg, #4a90e2, #67b8e3)'};
    opacity: ${props => props.$accentColor ? 0 : 1};
  }
`;

export const DashboardCardTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: #4a90e2;
  }
`;

export const DashboardCardContent = styled.div`
  color: #666;
`;

export const StatNumber = styled.div`
  font-size: 42px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: baseline;
  
  span {
    font-size: 16px;
    color: #666;
    margin-left: 5px;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ProgressContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ $percentage: number; $color?: string }>`
  height: 100%;
  width: ${props => `${props.$percentage}%`};
  background-color: ${props => props.$color || '#4a90e2'};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const TodayTasksSection = styled.div`
  margin-top: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 25px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
      color: #4a90e2;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  
  h3 {
    margin-bottom: 10px;
    color: #666;
  }
  
  p {
    margin-bottom: 20px;
  }
`;
