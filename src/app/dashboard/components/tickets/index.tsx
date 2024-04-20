"use client";

import React from "react";
import { FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi";
import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export default function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
        <td className=" text-black pl-1">{customer?.name}</td>
        <td className=" text-black hidden pl-1 my-4 sm:block">
          {ticket.created_at?.toLocaleString("pt-br")}
        </td>
        <td className="">
          <span className="bg-green-500 px-2 py-1">{ticket.status}</span>
        </td>
        <td className=" text-black">
          <button onClick={handleChangeStatus} className="mr-4">
            <FiCheckSquare size={24} color="#131313" />
          </button>
          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
