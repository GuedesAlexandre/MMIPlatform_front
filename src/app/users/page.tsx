"use client";

import React from "react";
import TitleUI from "../components/ui/TitleUI";
import AppTableUser from "../components/app-table-user";

function pages() {
  return (
    <>
      <TitleUI label="Gestion des professeurs" />
      <AppTableUser />
    </>
  );
}

export default pages;
