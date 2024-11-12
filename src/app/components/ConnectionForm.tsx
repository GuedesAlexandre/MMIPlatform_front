import React, { useEffect } from "react";
import InputUI from "./ui/InputUI";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import ButtonsUI from "./ui/ButtonsUI";
import { FieldValues, useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthRepository";

interface FormData {
  password: string;
  mail: string;
}
function ConnectionForm() {
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
      <div className="w-fit py-6 px-8 xs:px-12 xs:py-10 border-primary-blue border rounded-[30px] flex flex-col gap-5 mx-auto mt-40">
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

export default ConnectionForm;
