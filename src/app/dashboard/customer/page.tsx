import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/container";
import Link from "next/link";
import TicketItem from "../components/tickets";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-black text-3xl font-bold">Chamados</span>
          <Link href={"/dashboard/new"} />
          <button className="bg-blue-600 px-4 py-1 text-white font-thin rounded">
            Abrir chamado
          </button>
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
            <TicketItem />
          </tbody>
        </table>
      </main>
    </Container>
  );
}
