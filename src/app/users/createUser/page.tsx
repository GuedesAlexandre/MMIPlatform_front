"use client";

import AccordionPersonalInfo from "@/app/users/createUser/components/accordionPersonalInfo";
import AccordionSecurity from "@/app/users/createUser/components/accordionSecurity";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import AccordionLessons from "@/app/users/createUser/components/accordionLessons";

function Page() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>();

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
      <div className="sm:p-10 p-2">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <AccordionPersonalInfo
            register={register}
            errors={errors}
            trigger={trigger}
          />
          <AccordionSecurity
            register={register}
            errors={errors}
            trigger={trigger}
          />
          <AccordionLessons />
          <div className="justify-end flex mt-5">
            <Link href="/users">
              <ButtonsUI
                type="button"
                label="Retour"
                customClassName="!w-52 bg-danger text-white mr-5 hidden sm:block hover:bg-red-700 transition-colors duration-200"
              />
            </Link>
            <ButtonsUI
              type="submit"
              label="Enregister"
              customClassName="sm:!w-52 w-full"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;
