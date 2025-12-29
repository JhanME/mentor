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

    const mentorias = await prisma.mentorshipSession.findMany({
      where: {
        mentorship: {
          becarioId: session.user.id,
        },
      },
      select: {
        id: true,
        date: true,
        topics: true,
        status: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(mentorias);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}