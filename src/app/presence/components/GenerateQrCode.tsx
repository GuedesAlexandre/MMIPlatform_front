"use client";

import SelectUI from "@/app/components/ui/SelectUI";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

function GenerateQrCode({
  register,
  errors,
  trigger,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  trigger: (field: string) => Promise<boolean>;
}) {
  return (
    <>
      <div></div>
    </>
  );
}

export default GenerateQrCode;
