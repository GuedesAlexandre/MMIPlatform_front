"use client";
import Accordion from "@/app/components/accordion";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useInternshipStore } from "@/app/store/Internship.store";
import { ArrowLeftIcon, PersonIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InternshipPutForm from "./components/InternshipForm";
import { Internship } from "@/app/models/Internship";

const PutInternship = () => {
  const param = useSearchParams();
  const [numEtu] = useState<string | null>(param.get("numEtu"));
  const [promo] = useState<string | null>(param.get("promo"));
  const [years] = useState<number | null>(
    param.get("years") ? parseInt(param.get("years")!, 10) : null
  );
  const [title] = useState<string | null>(param.get("title"));
  const { internships, updateInternship } = useInternshipStore();
  const intershipForStudenSearch = internships?.find(
    (student) => student.numEtu === numEtu
  );
  const [internshipToPut] = useState(
    intershipForStudenSearch?.internships.find(
      (internship) => internship.years === years && internship.title === title
    )
  );
  const router = useRouter();
  if (internshipToPut === undefined) {
    router.push(
      `/internship/internship-management/?numEtu=${numEtu}&promo=${promo}`
    );
  }
  const onSubmit = (data: Internship) => {
    if (numEtu && years && title) {
      updateInternship(numEtu, years, title, data).then(() => {
        router.push(
          `/internship/internship-management/?numEtu=${numEtu}&promo=${promo}`
        );
      });
    }
  };

  return (
    <>
      <div
        onClick={() => router.back()}
        className="flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit pt-10"
      >
        <ArrowLeftIcon className="size-6 mr-1" />
        <p>Retour</p>
      </div>
      <TitleHeaderUI label="Modifier un stage" />
      <div className="p-10 mx-auto">
        <Accordion
          icon={<PersonIcon />}
          name={`Modifier le stage qui a pour intitulé ${title} et réalisé durant l'année ${years}`}
          open={false}
          data={
            <InternshipPutForm
              onSubmit={onSubmit}
              internshipToPut={internshipToPut}
            />
          }
        />
      </div>
    </>
  );
};

export default PutInternship;
