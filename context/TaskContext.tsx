import { Task } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface TaskContextProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setTasksInLocalStorage: (tasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  const setTasksInLocalStorage = (newTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, setTasksInLocalStorage }}>
      {children}
    </TaskContext.Provider>
  );
};
