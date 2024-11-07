"use client";

import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import InputUI from "./components/ui/InputUI";
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthRepository";
import { FieldValues, useForm } from "react-hook-form";
import ButtonsUI from "./components/ui/ButtonsUI";

interface FormData {
  password: string;
  mail: string;
}

export default function Home() {
  const { user, fetchAuthToken } = useAuthStore();
  const { register, handleSubmit } = useForm<FieldValues>();

  useEffect(() => {
    fetchAuthToken();
  }, []);

  const onSubmit = (data: FieldValues) => {
    const myData = data as FormData;
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-fit px-12 py-10 border-principale-blue border rounded-[30px] flex flex-col gap-5 mx-auto mt-40">
        <InputUI
          type="text"
          name="mail"
          label="Email"
          placeholder="Entrer votre Email"
          icon={<EnvelopeClosedIcon />}
          register={register}
          rules={{ required: true }}
        />
        <InputUI
          type="password"
          name="password"
          label="Mot de passe"
          placeholder="Entrer votre mot de passe"
          icon={<LockClosedIcon />}
          register={register}
          rules={{ required: true }}
        />
        <ButtonsUI type="submit" label="Connexion" />
      </div>
    </form>
  );
}
