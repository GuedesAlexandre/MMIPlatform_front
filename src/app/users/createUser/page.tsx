"use client";

import AccordionPersonalInfo from "@/app/components/accordionPersonalInfo";
import AccordionSecurity from "@/app/components/accordionSecurity";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

function Page() {
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit = (data: FieldValues) => {
    const myData = data as FormData;
    console.log(myData);
    // fetchAuthToken(myData.mail, myData.password).then((response) => {
    //   if (!response) {
    //     setError(true);
    //     return;
    //   }
    //   if (response) return;
    // });
  };
  return (
    <>
      <TitleHeaderUI label="Création d’un utilisateur" />
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <AccordionPersonalInfo register={register} />
          <AccordionSecurity register={register} />
          <ButtonsUI type="submit" label="Connexion" />
        </form>
      </div>
    </>
  );
}

export default Page;
