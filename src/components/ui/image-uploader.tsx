"use client";

import { FileText, ImageIcon, Upload, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface ImageUploaderProps {
  onSubmit?: (files: File[]) => void;
}

export function ImageUploader({ onSubmit }: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") || file.type === "application/pdf",
      );
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    if (inputRef.current) {
      const dt = new DataTransfer();
      newFiles.forEach((file) => dt.items.add(file));
      inputRef.current.files = dt.files;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(selectedFiles);
    } else {
      console.log("Selected files:", selectedFiles);
    }
    setSelectedFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="text-muted-foreground h-4 w-4 shrink-0" />;
    }
    return <ImageIcon className="text-muted-foreground h-4 w-4 shrink-0" />;
  };

  return (
    <Card className="mx-auto max-w-xl md:min-w-[500px]">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Input Area */}
          <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed text-center transition-colors">
            <input
              ref={inputRef}
              type="file"
              id="file-upload"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center gap-2 p-8"
            >
              <Upload className="text-muted-foreground h-8 w-8" />
              <div className="text-muted-foreground text-sm">
                <span className="text-primary font-medium">
                  Haz clic para subir
                </span>{" "}
                o arrastra y suelta
              </div>
              <div className="text-muted-foreground text-xs">
                Imágenes (PNG, JPG, GIF) y PDFs hasta 10MB
              </div>
            </label>
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Archivos Seleccionados ({selectedFiles.length})
              </h3>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <Card
                    key={index}
                    className="flex flex-row items-center gap-3 px-4 py-2"
                  >
                    {getFileIcon(file)}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {file.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="hover:bg-destructive/10 h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={selectedFiles.length === 0}
          >
            Enviar Archivos ({selectedFiles.length})
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
