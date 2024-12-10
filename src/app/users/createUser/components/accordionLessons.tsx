import { GridIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { getModuleStore } from "@/app/store/getAllModules";
import { moduleDataTable } from "@/app/utils/ModulesTableHelper";

function AccordionLessons() {
  const [open, setOpen] = useState(true);
  const { all_module, fetchModule } = getModuleStore();
  useEffect(() => {
    fetchModule();
  }, []);
  const allModuleToDataTable = moduleDataTable(all_module);

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
        <div className="pb-10 px-10">
          {allModuleToDataTable && (
            <DataTable columns={columns} data={allModuleToDataTable} />
          )}
        </div>
      )}
    </div>
  );
}

export default AccordionLessons;
