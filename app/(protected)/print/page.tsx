"use client"
import ImageUploader from "@/components/ui/image-uploader"
import { Printer } from "lucide-react"

export default function SimpleUploadPage() {
  const handleUpload = async (files: File[]) => {
    if (!files.length) return

    const formData = new FormData()
    files.forEach((f) => formData.append("file", f))

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      alert(`Archivos subidos correctamente. Task ID: ${data.taskId || "N/A"}`)
    } catch (err) {
      console.error(err)
      alert("Error subiendo archivos")
    }
  }

  return (
    <div>
      <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4 flex items-center justify-center'>
        <Printer className='mr-2 w-6 md:w-8 h-auto' />
        Imprimir
      </h2>
      <ImageUploader onSubmit={handleUpload} />
    </div>
  )
}
