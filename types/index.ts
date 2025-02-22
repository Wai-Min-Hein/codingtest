// types/index.ts
export type Task = {
    id: string;
    title: string;
    status: 'pending' | 'completed' | undefined;
  };
  