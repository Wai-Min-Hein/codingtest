// import { Task } from "@/types";
// import { useInfiniteQuery } from "@tanstack/react-query";

// // Fetch tasks with pagination
// const fetchTasks = async ({ pageParam = 1 }: { pageParam: number }) => {
//   const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
//   const pageSize = 5; // Number of tasks per page
//   const start = (pageParam - 1) * pageSize;
//   const end = start + pageSize;
//   const paginatedTasks = tasks.slice(start, end);

//   return {
//     data: paginatedTasks,
//     nextPage: paginatedTasks.length < pageSize ? undefined : pageParam + 1, // Stop if no more tasks
//   };
// };

// // Custom hook to use paginated tasks
// export const useTasks = () => {
//   return useInfiniteQuery(
//     ["tasks"], // Query key
//     fetchTasks, // Fetch function
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage
//     }
//   );
// };
