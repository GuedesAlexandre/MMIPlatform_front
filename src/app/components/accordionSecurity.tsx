import { LockClosedIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import InputToolTipUI from "./ui/InputToolTipUI";

function AccordionSecurity({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-placeholder-color border rounded-md mt-6">
      <div
        className="flex flex-row justify-between px-4 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-row items-center">
          <LockClosedIcon className="mr-2" />
          <p className="w-fit select-none">Sécurité</p>
        </div>
        {open ? (
          <ChevronDown onClick={() => setOpen(!open)} />
        ) : (
          <ChevronRight onClick={() => setOpen(!open)} />
        )}
      </div>
      {open && (
        <div className="pb-10 px-10 grid lg:grid-cols-2 lg:gap-x-10 gap-y-5 gap-10 pr-60">
          <InputToolTipUI
            type="password"
            name="password"
            label="Mot de passe"
            icon={<QuestionMarkCircledIcon />}
            message={
              <div className="ml-3 bg-blue-50 border border-blue-200 p-3 rounded-xl shadow-md">
                <h4 className="text-sm font-semibold text-blue-600 mb-2">
                  Votre Mots de passe
                </h4>
                <ul>
                  <li>Le mot de passe doit contenir au moins 8 caractères.</li>
                  <li>Il doit inclure au moins un chiffre.</li>
                  <li>Il doit contenir au moins une lettre minuscule.</li>
                  <li>Il doit contenir au moins une lettre majuscule.</li>
                  <li>Il doit inclure un caractère spécial.</li>
                </ul>
              </div>
            }
            placeholder="Entrer le mot de passe"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
        </div>
      )}
    </div>
  );
}

export default AccordionSecurity;
