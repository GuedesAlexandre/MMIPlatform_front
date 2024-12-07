"use client";

import React from "react";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import Link from "next/link";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import AppTableUser from "@/app/users/components/app-table-user";

function pages() {
  return (
    <>
      <TitleHeaderUI label="Gestion des professeurs" />
      <Link href="/users/createUser" className="w-7">
        <ButtonsUI
          label="+ Ajouter un professeur"
          type="button"
          customClassName="bg-primary-blue text-white !w-auto px-5 mb-5 ml-auto flex mr-[8.6666%]"
        />
      </Link>
      <AppTableUser />
    </>
  );
}

export default pages;
