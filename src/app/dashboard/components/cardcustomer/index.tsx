import React from "react";
import { CustomerProps } from "@/utils/customer.type";

export default function CardCustomer({
  customer,
}: {
  customer: CustomerProps;
}) {
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

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  );
}
