import React from "react";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

function Header() {
  return (
    <header className="w-full flex items-center px-2 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        <div className="flex items-baseline gap-4">
          <Link href={"/dashboard"}>
            <button>
              <FiUser size={26} color="#4b5563" />
            </button>
          </Link>
          <button>
            <FiLogOut size={26} color="#4b5563" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
