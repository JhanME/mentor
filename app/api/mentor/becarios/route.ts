import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'mentor') {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const becarios = await prisma.user.findMany({
      where: {
        mentorId: session.user.id,
        role: 'becario'
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    return NextResponse.json(becarios);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}