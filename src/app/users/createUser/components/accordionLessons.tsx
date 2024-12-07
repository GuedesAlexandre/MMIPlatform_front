import { GridIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

function AccordionLessons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-placeholder-color border rounded-md  mt-6">
      <div
        className="flex flex-row justify-between px-4 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-row items-center">
          <GridIcon className="mr-2" />
          <p className="w-fit select-none">Ressources de l’utilisateur</p>
        </div>
        {open ? (
          <ChevronDown onClick={() => setOpen(!open)} />
        ) : (
          <ChevronRight onClick={() => setOpen(!open)} />
        )}
      </div>
      {open && (
        <div className="pb-10 px-10 grid lg:grid-cols-2 lg:gap-x-10 gap-y-5 gap-10 lg:pr-60"></div>
      )}
    </div>
  );
}

export default AccordionLessons;
