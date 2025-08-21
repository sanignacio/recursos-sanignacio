"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { useEffect, useState } from "react";

interface UploadedFile {
  originalName: string;
  path: string;
  engrampado: boolean;
}

interface Task {
  taskId: string;
  userId: string;
  files: UploadedFile[];
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data.tasks || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markDone = async (taskId: string, userId: string) => {
    await fetch(`/api/tasks?taskId=${taskId}&userId=${userId}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div style={{ padding: "2rem" }}>
        <h1>Todas las tareas de impresión</h1>
        {tasks.length === 0 && <p>No hay tareas pendientes.</p>}
        {tasks.map(task => (
          <div key={task.taskId} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Usuario:</strong> {task.userId}</p>
          <p><strong>Task ID:</strong> {task.taskId}</p>
          <ul>
            {task.files.map((f, i) => (
              <li key={i} style={{ marginBottom: "0.25rem" }}>
                {f.originalName} {f.engrampado && "(Engrampado)"}
                <button
                  style={{ marginLeft: "1rem", padding: "0.2rem 0.5rem" }}
                  onClick={() => {
                    const url = `/api/tasks/download?userId=${task.userId}&taskId=${task.taskId}&fileName=${encodeURIComponent(f.originalName)}`;
                    window.open(url, "_blank");
                  }}
                >
                  Descargar
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => markDone(task.taskId, task.userId)}>Marcar como hecha / Cancelar</button>
          </div>
        ))}
      </div>
    </RoleGate>
  );
}
