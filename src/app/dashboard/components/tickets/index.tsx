import React from "react";
import { FiFile, FiTrash2 } from "react-icons/fi";

export default function TicketItem() {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
        <td className=" text-black pl-1">Mercado Silva</td>
        <td className=" text-black hidden pl-1 my-4 sm:block">17/04/2024</td>
        <td className="">
          <span className="bg-green-500 px-2 py-1">ABERTO</span>
        </td>
        <td className=" text-black">
          <button className="mr-2">
            <FiTrash2 size={24} color="#ef4444" />
          </button>
          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
