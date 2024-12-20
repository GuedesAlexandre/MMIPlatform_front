"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  CheckboxIcon,
  ArrowLeftIcon,
  PinBottomIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { toSlug } from "@/app/utils/textToSlug";
import { useRouter } from "next/navigation";
import Accordion from "@/app/components/accordion";
import AccordionResourceTable from "@/app/resources/[resource]/components/accordionResourceTable";
import AccordionControlTable from "@/app/resources/[resource]/components/accordionControlTable";
import { Module } from "@/app/resources/models/modules.model";

const Resource = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const parsedData: Module = data ? JSON.parse(data) : null;
  const title: string | undefined = parsedData?.name;
  const titlePathname: string = toSlug(title);
  const router = useRouter();
  const getMatrix = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_API_PATH}/export/modules?promo=${parsedData.promo}&semester=${parsedData.semester}&ueName=${parsedData.ueName}&moduleName=${parsedData.name}`
    );
  };

  return (
    <>
      <TitleHeaderUI label={title} />
      <div
        onClick={() => router.back()}
        className="flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit"
      >
        <ArrowLeftIcon className="size-6 mr-1" />
        <p>Retour</p>
      </div>
      <div className="p-10 mx-auto">
        <div className="mb-5 grid justify-end">
          <div
            className="flex flex-row items-center cursor-pointer hover:underline"
            onClick={getMatrix}
          >
            <PinBottomIcon />
            <p className="ml-2">Télécharger l&apos;excel du module</p>
          </div>
        </div>
        <Accordion
          icon={<PersonIcon />}
          name={"Liste des étudiants"}
          open={false}
          data={
            <AccordionResourceTable
              promo={parsedData.promo}
              ueName={parsedData.ueName}
              ressourceName={parsedData.name}
            />
          }
        />
        <Accordion
          icon={<ReaderIcon />}
          name={"Liste des contrôles"}
          open={false}
          data={
            <AccordionControlTable
              promo={parsedData.promo}
              resourceName={parsedData.name}
            />
          }
        />
        <div
          onClick={() => {
            router.push(
              `${titlePathname}/control?name=${parsedData.name}&promo=${parsedData.promo}`
            );
          }}
          className="flex flex-row justify-between border border-placeholder-color rounded-md px-4 py-5 cursor-pointer"
        >
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
