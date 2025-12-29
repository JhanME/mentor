import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'becario') {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const tareas = await prisma.task.findMany({
      where: {
        mentorship: {
          becarioId: session.user.id,
        },
      },
      select: {
        id: true,
        description: true,
        status: true,
        dueDate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tareas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}