'use client'

import React from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {  QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TaskProvider } from "@/context/TaskContext";

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>

      {children}
      </TaskProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
