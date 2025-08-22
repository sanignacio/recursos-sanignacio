"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Loader2 } from "lucide-react"; // Spinner icon

interface FileItem {
  name: string;
}

interface Task {
  taskId: string;
  userId: string;
  files: FileItem[];
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // estado de carga

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markDone = async (taskId: string, userId: string) => {
    setLoading(true);
    await fetch(`/api/tasks?taskId=${taskId}&userId=${userId}`, { method: "DELETE" });
    await fetchTasks();
  };

  const downloadFile = (task: Task, file: FileItem) => {
    const url = `/api/tasks/download?userId=${task.userId}&taskId=${task.taskId}&fileName=${encodeURIComponent(file.name)}`;
    window.open(url, "_blank");
  };

  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className="relative p-8 max-w-5xl mx-auto">
        {loading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-black/50 flex items-center justify-center z-10">
            <Loader2 className="animate-spin w-12 h-12 text-gray-700 dark:text-gray-200" />
          </div>
        )}

        <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4 flex items-center justify-center'>
          <List className='mr-2 w-6 md:w-8 h-auto' />
          Tareas de impresión
        </h2>

        {!loading && tasks.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No hay tareas pendientes.</p>
        )}

        <div className="space-y-6">
          {tasks.map(task => (
            <Card key={task.taskId} className="shadow-sm min-w-[500px]">
              <CardHeader>
                <div className="flex flex-col items-center font-semibold">
                  <p>Usuario: {task.userId}</p>
                  <p>Task ID: {task.taskId}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {task.files.map((f, i) => (
                    <li key={i} className="w-full">
                      <Card className="flex justify-between items-center pl-6 pr-1 py-1">
                        <span>{f.name}</span>
                        <Button onClick={() => downloadFile(task, f)}>Descargar</Button>
                      </Card>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => markDone(task.taskId, task.userId)}
                  >
                    Hecho
                  </Button>
                  <Button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => markDone(task.taskId, task.userId)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RoleGate>
  );
}
