import React from "react";
import DashboardHeader from "./components/header";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white">
      <DashboardHeader />
      {children}
    </div>
  );
}
