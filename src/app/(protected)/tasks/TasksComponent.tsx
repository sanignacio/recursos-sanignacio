'use client'

import { RoleGate } from '@/components/auth/role-gate'
import { UserRole } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'
import { PulseLoader } from 'react-spinners'

interface FileItem {
  name: string
}

interface Task {
  taskId: string
  userId: string
  files: FileItem[]
}

export default function TasksComponent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/tasks')
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const markDone = async (taskId: string, userId: string) => {
    setLoading(true)
    await fetch(`/api/tasks?taskId=${taskId}&userId=${userId}`, {
      method: 'DELETE',
    })
    await fetchTasks()
  }

  const downloadFile = (task: Task, file: FileItem) => {
    const url = `/api/tasks/download?userId=${task.userId}&taskId=${task.taskId}&fileName=${encodeURIComponent(file.name)}`
    window.open(url, '_blank')
  }

  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className='mx-auto max-w-5xl p-8'>
        <h2 className='flex items-center justify-center pb-6 text-xl font-bold tracking-tight md:text-3xl'>
          <List className='mr-2 h-auto w-6 md:w-8' />
          Tareas de impresión
        </h2>

        {loading && (
          <div className='flex h-6 justify-center pb-4'>
            <PulseLoader color='white' size={10} margin={2} />
          </div>
        )}

        {tasks.length === 0 && !loading && (
          <p className='text-center text-gray-500 dark:text-gray-400'>
            No hay tareas pendientes.
          </p>
        )}

        <div className='space-y-6'>
          {tasks.map(task => (
            <Card key={task.taskId} className='min-w-[500px] shadow-xs'>
              <CardHeader>
                <div className='flex flex-col items-center font-semibold'>
                  <p>Usuario: {task.userId}</p>
                  <p>Task ID: {task.taskId}</p>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ul className='space-y-2'>
                  {task.files.map((f, i) => (
                    <li key={i} className='w-full'>
                      <Card className='flex items-center justify-between py-1 pr-1 pl-6'>
                        <span>{f.name}</span>
                        <Button onClick={() => downloadFile(task, f)}>
                          Descargar
                        </Button>
                      </Card>
                    </li>
                  ))}
                </ul>

                <div className='flex gap-4'>
                  <Button
                    className='flex-1 bg-green-500 text-white hover:bg-green-600'
                    onClick={() => markDone(task.taskId, task.userId)}
                  >
                    Hecho
                  </Button>
                  <Button
                    className='flex-1 bg-red-500 text-white hover:bg-red-600'
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
  )
}
