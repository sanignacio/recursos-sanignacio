import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { currentUser } from "@/lib/authentication";
import { v4 as uuidv4 } from "uuid";
import { UserRole } from "@prisma/client";
import { writeFile } from "fs/promises";

export const dynamic = "force-dynamic";

interface UploadedFile {
  name: string;
}

interface Task {
  taskId: string;
  userId: string;
  files: UploadedFile[];
}

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export async function GET(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  if (session.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "No autorizado: solo admins" }, { status: 403 });
  }

  if (!fs.existsSync(UPLOADS_DIR)) return NextResponse.json({ tasks: [] });

  const tasks: Task[] = [];
  const users = fs
    .readdirSync(UPLOADS_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);


  users.forEach((userId) => {
    const userDir = path.join(UPLOADS_DIR, userId);
    const taskIds = fs
      .readdirSync(userDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    taskIds.forEach((taskId) => {
      const taskDir = path.join(userDir, taskId);

      const files = fs
        .readdirSync(taskDir, { withFileTypes: true })
        .filter((dirent) => dirent.isFile())
        .map((dirent) => ({ name: dirent.name }));

      tasks.push({ taskId, userId, files });
    });
  });

  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = session.id.toString();
  const taskId = uuidv4();
  const uploadDir = path.join(UPLOADS_DIR, userId, taskId);
  fs.mkdirSync(uploadDir, { recursive: true });

  const formData = await req.formData();
  const uploadedFiles: UploadedFile[] = [];

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
  }

  try {
    for (const [_, value] of Array.from(formData.entries())) {
      if (value instanceof File) {
        const filename =  value.name.replaceAll(" ", "_");
        const buffer = Buffer.from(await value.arrayBuffer());
        await writeFile(
          path.join(uploadDir, filename),
          buffer
        )
        uploadedFiles.push({ name: value.name });
      }
    }
    return NextResponse.json({ message: "Éxito", taskId, status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al guardar el archivo." }, { status: 500 });
  }
};

export async function DELETE(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const taskId = req.nextUrl.searchParams.get("taskId");
  const userId = req.nextUrl.searchParams.get("userId");
  
  if (!userId || !taskId) return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });

  const taskDir = path.join(UPLOADS_DIR, userId, taskId);
  if (fs.existsSync(taskDir)) fs.rmSync(taskDir, { recursive: true, force: true });

  return NextResponse.json({ success: true });
}
