// "use client";

// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { useAddTask, useDeleteTask, useUpdateTask } from "@/hooks/useTaskMutations";
// import { useTasks } from "@/context/TaskContext";
// import { Task } from "@/types";
// import { useInfiniteQuery } from "@tanstack/react-query";

// const fetchItems = async ({ pageParam = 1 }) => {
//   const storedData = JSON.parse(localStorage.getItem("tasks") || "[]");
//   return storedData.slice((pageParam - 1) * 5, pageParam * 5);
// };
// const Home = () => {
//   const { setTasks } = useTasks();

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["items"],
//     queryFn: fetchItems,
//     getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length + 1 : undefined),
//   });

//   const { mutateAsync: addTask } = useAddTask();

//   const task = z.object({
//     id: z.string(),
//     title: z.string().min(1, { message: "Title must be included." }),
//     status: z.enum(["pending", "completed",''], { message: "Invalid status." }),
//   });

//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   const form = useForm<z.infer<typeof task>>({
//     resolver: zodResolver(task),
//     defaultValues: editingTask ||{
//       id: uuidv4()+ Date.now(),
//       title: "",
//       status: undefined,
//     },
//   });

//   async function onSubmit(values: z.infer<typeof task>) {
//     if (editingTask) {
//       await updateTask(values);
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task.id === values.id ? values : task))
//       );
//       setEditingTask(null);
//     } else {
//       await addTask(values);
//       setTasks((prevTasks) => [...prevTasks, values]);
//     }
//     form.reset();
//     form.setValue("title", "");
//     form.setValue("status", '');
//   }

//   const { mutateAsync: updateTask } = useUpdateTask();
//   const { mutateAsync: deleteTask } = useDeleteTask();
//   const [filter, setFilter] = useState("all");

//   const filteredData = data?.pages.flat().filter((item) => {
//     if (filter === "all") return true; // Show all items
//     return item.status === filter; // Filter by status (pending/completed)
//   }) || [];

//   async function handleDelete(id: string) {
//     await deleteTask(id);
//     setTasks((prev) => prev.filter((item) => item.id !== id));

//   }

//   function handleEdit(task: Task) {
//     setEditingTask(task);
//     form.reset(task);
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="completed">Completed</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>

//       <div className="flex gap-4">
//         {["all", "pending", "completed"].map((status) => (
//           <Button
//             key={status}
//             variant={filter === status ? "default" : "outline"}
//             onClick={() => setFilter(status)}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </Button>
//         ))}
//       </div>

//       <div className="space-y-4">
//         {filteredData.map((item) => (
//           <div key={item.id} className="mb-2 p-2 flex justify-between items-center">
//             <p>{item.title}</p>
//             <p>{item.status}</p>
//           </div>
//         ))}
//       </div>

//       {hasNextPage && (
//         <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="mt-4">
//           {isFetchingNextPage ? "Loading..." : "Load More"}
//         </Button>
//       )}

//       {/* 📋 Task List */}
//       {/* <div className="space-y-4">
//         {filteredTasks.map((task) => (
//           <div key={task.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
//             <div>
//               <p className="text-lg font-semibold">{task.title}</p>
//               <p className="text-sm text-gray-500">{task.status}</p>
//             </div>
//             <div className="flex gap-2">
//               <Button size="sm" onClick={() => handleEdit(task)}>Edit</Button>
//               <Button size="sm" variant="destructive" onClick={() => handleDelete(task.id)}>
//                 Delete
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default Home;

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddTask,
  useDeleteTask,
  useUpdateTask,
} from "@/hooks/useTaskMutations";
import { useTasks } from "@/context/TaskContext";
import { Task } from "@/types";
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton
import { useInfiniteQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

const fetchItems = async ({ pageParam = 1, pageSize = 5 }) => {
  const storedData = JSON.parse(localStorage.getItem("tasks") || "[]");
  return storedData.slice((pageParam - 1) * pageSize, pageParam * pageSize); 
};

const Home = () => {
  const { tasks, setTasks } = useTasks();
  const pageSize = 5;

  // Infinite Query for fetching paginated tasks
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["tasks"],
      queryFn: ({ pageParam = 1 }) => fetchItems({ pageParam, pageSize }),  // Pass pageSize here
      getNextPageParam: (lastPage, pages) =>
        lastPage.length ? pages.length + 1 : undefined, // Get next page param if more data exists
    });

  const { mutateAsync: addTask } = useAddTask();
  const { mutateAsync: updateTask } = useUpdateTask();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const taskSchema = z.object({
    id: z.string(),
    title: z.string().min(1, { message: "Title must be included." }),
    status: z.enum(["pending", "completed"], {
      message: "Invalid status.",
    }),
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("all"); // Filter state for task status

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: editingTask || {
      id: uuidv4() + Date.now(),
      title: "",
      status: undefined,
    },
  });

  const filteredData: Task[] = (data?.pages.flat() || [])
    .filter((item) => {
      if (filter === "all") return true;
      return item.status === filter; 
    })
    .reduce((uniqueItems, item) => {
      if (!uniqueItems.some((i: Task) => i.id === item.id)) {
        uniqueItems.push(item); 
      }
      return uniqueItems;
    }, []);

  const [submitting, setSubmitting] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    setSubmitting(true); 

    try {
      if (editingTask) {
        await updateTask(values);
        setTasks(tasks.map((task) => (task.id === values.id ? values : task)));
        setEditingTask(null);
        form.setValue("title", "");
        form.setValue("id", "");
        form.setValue("status", "");
      } else {
        await addTask(values);
        // setTasks((prevTasks) => [...prevTasks, values]);
        setTasks([...tasks, values]);
        form.setValue("title", "");
        form.setValue("id", "");
        form.setValue("status", "");
      }
    } catch (error) {
      
      console.error("Error submitting task:", error);
    } finally {
      setSubmitting(false); 
    }
  }

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);

    try {
      await deleteTask(id);
      setTasks(tasks.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeletingId(null);
    }
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    form.reset(task);
  }

  // Handle "Load More" functionality
  const handleLoadMore = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className=" w-full md:w-1/2 lg:w-1/3 border border-gray-400 mx-auto px-6 py-8 shadow-lg rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? <ClipLoader size={20} color="#ffffff" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-full md:w-3/5 lg:w-2/5 mx-auto">
        <div className="flex gap-4">
          {["all", "pending", "completed"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            // Display Skeleton Loader
            <div>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full mb-2" />
              ))}
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="mb-2 p-2 flex justify-between items-center"
              >
                <p>{item.title}</p>
                <p>{item.status}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? <ClipLoader size={20} color="#ffffff" /> : "Delete"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {isLoading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <>
            {hasNextPage && (
              <Button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="mt-4"
              >
                {isFetchingNextPage && hasNextPage ? "Loading..." : "Load More"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
