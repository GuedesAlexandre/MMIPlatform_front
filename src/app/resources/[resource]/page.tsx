"use client";

import { UserModules } from "@/app/auth/models/User";
import AccordionResource from "@/app/components/accordionResource";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CheckboxIcon } from "@radix-ui/react-icons";
const Resource = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const parsedData: UserModules = data ? JSON.parse(data) : null;
  const title: string | undefined = parsedData?.name;
  return (
    <>
      <TitleHeaderUI label={title} />
      <div className="p-10 mx-auto">
        <AccordionResource module={parsedData} />
        <div className="flex flex-row justify-between border border-placeholder-color rounded-md px-4 py-5 mt-5">
          <div className="flex flex-row items-center">
            <CheckboxIcon className="mr-1" />
            <p>Démarrer une évalution</p>
          </div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};
export default Resource;
