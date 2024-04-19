import { Container } from "@/components/container";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export default async function NewTicketPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    redirect("/");
  }
  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) return;

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            className="text-white px-4 py-1 rounded bg-gray-900"
            href={"/dashboard"}
          >
            Voltar
          </Link>
          <h1 className="text-black text-3xl font-bold">Novo Chamado</h1>
        </div>
      </main>

      <form action={handleRegisterTicket} className="flex flex-col mt-6">
        <label className="text-black mb-1 font-medium text-lg" htmlFor="">
          Nome do chamado
        </label>
        <input
          type="text"
          className="text-black w-full border-2 rounded-md px-2 md-2 h-11"
          placeholder="Digite o nome do chamado"
          required
          name="name"
        />

        <label className="text-black mb-1 font-medium text-lg" htmlFor="">
          Descreva o problema
        </label>
        <textarea
          className="text-black w-full border-2 rounded-md px-2 md-2 h-24 resize-none"
          placeholder="Digite o nome do chamado..."
          required
          name="description"
        />

        {customers.length !== 0 && (
          <>
            <label className="text-black mb-1 font-medium text-lg" htmlFor="">
              Selecione o cliente
            </label>
            <select
              name="customer"
              id=""
              className="text-black w-full border-2 rounded-md px-2 md-2 h-11 bg-white"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </>
        )}

        {customers.length === 0 && (
          <Link className="text-black" href={"/dashboard/customer/new"}>
            Você não tem nenhum cliente,{" "}
            <span className="text-blue-500 font-medium">
              Cadastrar clientes
            </span>
          </Link>
        )}

        <button
          disabled={customers.length === 0}
          type="submit"
          className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400"
        >
          Cadastrar
        </button>
      </form>
    </Container>
  );
}
