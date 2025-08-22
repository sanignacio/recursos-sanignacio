import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { currentUser } from "@/lib/authentication";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await currentUser();
  if (!session?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = req.nextUrl.searchParams.get("userId");
  const taskId = req.nextUrl.searchParams.get("taskId");
  const fileName = req.nextUrl.searchParams.get("fileName");

  if (!userId || !taskId || !fileName) return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });

  if (session.role !== "ADMIN" && session.id.toString() !== userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "uploads", userId, taskId, fileName);
  if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
