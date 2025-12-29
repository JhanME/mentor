import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'becario') {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { status } = await request.json();

    if (!['pending', 'completed'].includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    // Verificar que la tarea pertenece al becario
    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        mentorship: {
          becarioId: session.user.id,
        },
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}