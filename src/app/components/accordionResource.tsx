import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import AccordionResourceTable from "@/app/components/ui/accordionResourceTable";
import { UserModules } from "@/app/auth/models/User";

const AccordionResource = ({ module }: { module: UserModules }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="border-placeholder-color border rounded-md">
      <div
        className="flex flex-row justify-between px-4 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="w-fit select-none">Voir les étudiants</p>
        {open ? (
          <ChevronDown onClick={() => setOpen(!open)} />
        ) : (
          <ChevronRight onClick={() => setOpen(!open)} />
        )}
      </div>
      {open && (
        <div className="p-4">
          <AccordionResourceTable
            promo={module.promo}
            ueName={module.ueName}
            ressourceName={module.name}
          />
        </div>
      )}
    </div>
  );
};
export default AccordionResource;
