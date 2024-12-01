"use client";

import React from "react";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import AppTableUser from "@/app/components/app-table-user";

function pages() {
  return (
    <>
      <TitleHeaderUI label="Gestion des professeurs" />
      <AppTableUser />
    </>
  );
}

export default pages;
