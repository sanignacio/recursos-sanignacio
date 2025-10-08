"use client";

import { Printer } from "lucide-react";
import { ComboBoxResponsive } from "~/components/ui/combobox";

import ImageUploader from "~/components/ui/image-uploader";

const options = [
  {
    value: "js",
    label: "JavaScript",
    subOptions: [
      { value: "node", label: "Node.js" },
      { value: "express", label: "Express.js" },
    ],
  },
  {
    value: "ts",
    label: "TypeScript",
    subOptions: [
      { value: "next", label: "Next.js" },
      { value: "nest", label: "NestJS" },
    ],
  },
];

<ComboBoxResponsive options={options} />;

export default function PrintComponent() {
  const handleUpload = async (files: File[]) => {
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((f) => formData.append("file", f));

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: formData,
      });

      type TaskResponse = {
        taskId?: string;
      };

      const data: TaskResponse = await res.json();
      alert(`Archivos subidos correctamente. Task ID: ${data.taskId ?? "N/A"}`);
    } catch (err) {
      console.error(err);
      alert("Error subiendo archivos");
    }
  };

  return (
    <div>
      <h2 className="flex items-center justify-center pb-4 text-xl font-bold tracking-tight md:text-3xl">
        <Printer className="mr-2 h-auto w-6 md:w-8" />
        Imprimir
      </h2>
      <ComboBoxResponsive options={options} />
      <ImageUploader onSubmit={handleUpload} />
    </div>
  );
}
