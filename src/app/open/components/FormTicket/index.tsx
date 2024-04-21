"use client";

import React from "react";
import Input from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";

interface FormTicketProps {
  customer: CustomerDataInfo;
}

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "Descreva um pouco sobre o problema..."),
});

type FormData = z.infer<typeof schema>;

export default function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
  }
  return (
    <form
      action=""
      className="bg-slate-200 mt-6 py-6 rounded border-2"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label htmlFor="" className="mb-1 text-black font-medium text-lg">
        Nome do chamado
      </label>
      <Input
        name="name"
        register={register}
        type="text"
        placeholder="Digite o nome do chamado"
        error={errors.name?.message}
      />

      <label htmlFor="" className="mb-1 text-black font-medium text-lg">
        Descreva o problema
      </label>
      <textarea
        className="w-full text-black border-2 rounded-md h-24 resize-none px-2"
        id="description"
        {...register("description")}
        placeholder="Descreva o problema"
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 mt-1 mb-4">{errors.description.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
