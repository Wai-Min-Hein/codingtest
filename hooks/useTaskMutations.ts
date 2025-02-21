// hooks/useTaskMutations.ts
import { Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  const [localData, setLocalData] = useState(() =>
    JSON.parse(localStorage.getItem("items") || "[]")
  );
  return useMutation({
    mutationFn: async (newTask: Task) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return newTask;
    },
    onSuccess: async (newTask: Task) => {
      setLocalData((prev: Task[]) => [...prev, newTask]);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.refetchQueries({ queryKey: ["tasks"] });
    },
  });
};
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      const index = tasks.findIndex((task) => task.id === updatedTask.id);

      if (index !== -1) {
        tasks[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      return updatedTask;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const [localData, setLocalData] = useState(() =>
    JSON.parse(localStorage.getItem("items") || "[]")
  );

  return useMutation({
    mutationFn: async (taskId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return taskId;
    },
    onSuccess: async(taskId:string) => {
      setLocalData((prev:Task[]) => prev.filter((item) => item.id !== taskId));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
