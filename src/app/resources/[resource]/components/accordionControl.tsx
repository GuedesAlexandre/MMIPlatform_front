"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ReaderIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import AccordionControlTable from "./accordionControlTable";
const AccordionControl = ({ moduleName }: { moduleName: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="border-placeholder-color border rounded-md mt-5">
      <div
        className="flex flex-row justify-between px-4 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-row items-center">
          <ReaderIcon className="mr-2" />
          <p className="w-fit select-none">Liste des contrôles</p>
        </div>
        {open ? (
          <ChevronDown onClick={() => setOpen(!open)} />
        ) : (
          <ChevronRight onClick={() => setOpen(!open)} />
        )}
      </div>
      {open && (
        <div className="p-4">
          <AccordionControlTable />
        </div>
      )}
    </div>
  );
};
export default AccordionControl;
