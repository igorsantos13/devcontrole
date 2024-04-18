import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/container";
import Link from "next/link";
import TicketItem from "../components/tickets";
import CardCustomer from "../components/cardcustomer";
import prismaClient from "@/lib/prisma";

//note: this is a server component, that means you already have access to whatever is in your databse, no need to fetch data
export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>
        {customers.length === 0 && (
          <h1 className="text-gray-600">
            Você ainda não possui nenhum cliente
          </h1>
        )}
      </main>
    </Container>
  );
}
