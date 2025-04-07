import { format, isToday, parseISO } from 'date-fns';

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, yyyy');
};

export const formatDateWithTime = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy h:mm a');
};

export const isTaskDueToday = (dateString: string | null): boolean => {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  return isToday(date);
};

export const isTaskOverdue = (dateString: string | null): boolean => {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  const today = new Date();
  
  return date < today && !isToday(date);
};
