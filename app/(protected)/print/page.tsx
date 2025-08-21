"use client";

import { useState } from "react";

interface FileWithStamp {
  file: File;
  engrampado: boolean;
  previewUrl: string;
}

export default function PrintPage() {
  const [files, setFiles] = useState<FileWithStamp[]>([]);
  const [taskId, setTaskId] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: FileWithStamp[] = Array.from(e.target.files).map(f => ({
      file: f,
      engrampado: false,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : "",
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const toggleEngrampado = (index: number) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, engrampado: !f.engrampado } : f));
  };

  const engramparTodos = () => setFiles(prev => prev.map(f => ({ ...f, engrampado: true })));
  const desengrampadoTodos = () => setFiles(prev => prev.map(f => ({ ...f, engrampado: false })));
  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const handleUpload = async () => {
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(f => {
      formData.append("files", f.file);
      formData.append(`engrampado-${f.file.name}`, f.engrampado.toString());
    });

    const res = await fetch(`/api/tasks${taskId ? "?taskId=" + taskId : ""}`, { method: "POST", body: formData });
    const data = await res.json();
    setTaskId(data.taskId);
    alert("Archivos subidos correctamente");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Subir archivos para impresión</h1>
      <input type="file" multiple accept="image/*,application/pdf" onChange={handleFileChange} />

      {files.length > 0 && (
        <>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button onClick={engramparTodos}>Engrampado todos</button>
            <button onClick={desengrampadoTodos}>Desengrampado todos</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            {files.map((f, i) => (
              <div key={i} style={{ border: "1px solid #ccc", padding: "0.5rem", borderRadius: "8px", textAlign: "center" }}>
                {f.previewUrl ? <img src={f.previewUrl} alt={f.file.name} style={{ maxWidth: "100%", maxHeight: "80px" }} /> :
                  <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>{f.file.name.split(".").pop()?.toUpperCase()}</div>}
                <div style={{ marginTop: "0.5rem" }}>
                  <label>
                    <input type="checkbox" checked={f.engrampado} onChange={() => toggleEngrampado(i)} /> Engrampado
                  </label>
                </div>
                <button onClick={() => removeFile(i)} style={{ marginTop: "0.5rem", color: "red" }}>Eliminar</button>
              </div>
            ))}
          </div>
          <button onClick={handleUpload} style={{ marginTop: "1rem" }}>Subir Archivos</button>
        </>
      )}
    </div>
  );
}
