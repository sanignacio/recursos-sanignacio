import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { currentUser } from "@/lib/authentication";
import { v4 as uuidv4 } from "uuid";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

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

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

function getAllTasks(): Task[] {
  if (!fs.existsSync(UPLOADS_DIR)) return [];
  const users = fs.readdirSync(UPLOADS_DIR);
  const tasks: Task[] = [];

  users.forEach((userId) => {
    const userDir = path.join(UPLOADS_DIR, userId);
    const taskIds = fs.readdirSync(userDir);

    taskIds.forEach((taskId) => {
      const metaPath = path.join(userDir, taskId, "metadata.json");
      if (fs.existsSync(metaPath)) {
        const metadata = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
        tasks.push({ taskId, userId, files: metadata.files });
      }
    });
  });

  return tasks;
}

export async function GET(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  if (session.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "No autorizado: solo admins" }, { status: 403 });
  }

  const tasks = getAllTasks();
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = session.id.toString();
  let taskId = req.nextUrl.searchParams.get("taskId") || uuidv4();
  const uploadDir = path.join(UPLOADS_DIR, userId, taskId);
  fs.mkdirSync(uploadDir, { recursive: true });

  const formData = await req.formData();
  const uploadedFiles: UploadedFile[] = [];

  for (const [_, value] of Array.from(formData.entries())) {
    if (value instanceof File) {
      const engrampado = formData.get(`engrampado-${value.name}`) === "true";
      const filePath = path.join(uploadDir, value.name);
      const buffer = Buffer.from(await value.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      uploadedFiles.push({ originalName: value.name, path: filePath, engrampado });
    }
  }

  const metaPath = path.join(uploadDir, "metadata.json");
  fs.writeFileSync(metaPath, JSON.stringify({ taskId, files: uploadedFiles }, null, 2));

  return NextResponse.json({ taskId, uploadedFiles });
}

export async function DELETE(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const taskId = req.nextUrl.searchParams.get("taskId");
  const userId = req.nextUrl.searchParams.get("userId") || session.id.toString();

  if (!taskId) return NextResponse.json({ error: "Falta taskId" }, { status: 400 });

  const taskDir = path.join(UPLOADS_DIR, userId, taskId);
  if (fs.existsSync(taskDir)) fs.rmSync(taskDir, { recursive: true, force: true });

  return NextResponse.json({ success: true });
}
