import React from "react";
import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import TicketItem from "./components/tickets";
import prismaClient from "@/lib/prisma";
import ButtonRefresh from "./components/button";

async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  console.log(tickets);
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-black text-3xl font-bold">Chamados</span>
          <div className="flex items-center gap-3">
            <ButtonRefresh />
            <Link href={"/dashboard/new"}>
              <button className="bg-blue-600 px-4 py-1 text-white font-thin rounded">
                Abrir chamado
              </button>
            </Link>
          </div>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="text-black font-medium text-left">CLIENTE</th>
              <th className="text-black font-medium text-left hidden sm:block">
                DATA CADASTRO
              </th>
              <th className="text-black font-medium text-left">STATUS</th>
              <th className="text-black font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>

        {tickets.length <= 0 && (
          <h2 className="text-gray-600 px-2">
            Nenhum ticket foi encontrado...{" "}
          </h2>
        )}
      </main>
    </Container>
  );
}

export default Dashboard;
