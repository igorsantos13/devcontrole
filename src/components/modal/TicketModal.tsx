"use client";

import React, { useRef } from "react";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
import { MouseEvent } from "react";

export default function TicketModal() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };
  return (
    <div
      className="absolute bg-gray-900/80 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-black text-lg ">
              Detalhes do chamado:
            </h1>
            <button
              className="bg-red-500 p-1 px-2"
              onClick={handleModalVisible}
            >
              Fechar
            </button>
          </div>

          <div className="ml-2 flex flex-wrap gap-1 mb-2">
            <h2 className="text-black font-bold">Nome:</h2>
            <p className="text-black">{ticket?.ticket.name}</p>
          </div>

          <div className="ml-2 flex flex-wrap gap-1 mb-2">
            <h2 className="text-black font-bold">Descrição</h2>
            <p className="text-black">{ticket?.ticket.description}</p>
          </div>
          <hr className="border-2 border-slate-600" />

          <div className="w-full border-b-[1.5px] my-4">
            <h1 className="font-bold text-black text-lg ">
              Detalhes do cliente
            </h1>

            <div className="ml-2 flex flex-wrap gap-1 mb-2">
              <h2 className="text-black font-bold">Nome:</h2>
              <p className="text-black">{ticket?.customer.name}</p>
            </div>

            <div className="ml-2 flex flex-wrap gap-1 mb-2">
              <h2 className="text-black font-bold">Telefone:</h2>
              <p className="text-black">{ticket?.customer.phone}</p>
            </div>

            <div className="ml-2 flex flex-wrap gap-1 mb-2">
              <h2 className="text-black font-bold">Email:</h2>
              <p className="text-black">{ticket?.customer.email}</p>
            </div>

            {ticket?.customer.address && (
              <div className="ml-2 flex flex-wrap gap-1 mb-2">
                <h2 className="text-black font-bold">Enderço:</h2>
                <p className="text-black">{ticket?.customer.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
