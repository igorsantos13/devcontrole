import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const getTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!getTicket) {
    return NextResponse.json(
      { error: "could not fetch tickets" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "chamado atualizado com sucesso" });
  } catch (err) {
    return NextResponse.json({ error: "Filed update ticket" }, { status: 400 });
  }
}
