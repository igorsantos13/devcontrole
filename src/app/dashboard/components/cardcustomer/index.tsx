"use client";

import React from "react";
import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CardCustomer({
  customer,
}: {
  customer: CustomerProps;
}) {
  const router = useRouter();
  async function handleDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105">
      <h2 className="text-black">
        <a className="font-bold text-black">Nome:</a> {customer.name}
      </h2>
      <h2 className="text-black">
        <a className="font-bold text-black">Email:</a> {customer.email}
      </h2>
      <h2 className="text-black">
        <a className="font-bold text-black">Telefone:</a> {customer.phone}
      </h2>

      <button
        onClick={handleDeleteCustomer}
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
      >
        Deletar
      </button>
    </article>
  );
}
