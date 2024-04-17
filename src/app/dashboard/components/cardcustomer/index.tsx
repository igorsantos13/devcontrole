import React from "react";

export default function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105">
      <h2 className="text-black">
        <a className="font-bold text-black">Nome:</a> Mercado Silva
      </h2>
      <h2 className="text-black">
        <a className="font-bold text-black">Email:</a> teste@teste.com
      </h2>
      <h2 className="text-black">
        <a className="font-bold text-black">Telefone:</a>(xx) xxxxx-xxxx
      </h2>
      <h2 className="text-black">
        <a className="font-bold text-black"></a> Mercado Silva
      </h2>

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  );
}
