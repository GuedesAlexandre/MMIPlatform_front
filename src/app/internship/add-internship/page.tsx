"use client";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useInternshipStore } from "@/app/store/Internship.store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Internship } from "@/app/models/Internship";
import InternshipForm from "@/app/internship/add-internship/components/InternshipForm";
import Accordion from "@/app/components/accordion";
import { PersonIcon } from "@radix-ui/react-icons";

const PostInternship = () => {
  const param = useSearchParams();
  const [numEtu, setNumEtu] = useState<string | null>(param.get("numEtu"));
  const [promo, setPromo]= useState<string | null>(param.get("promo"));
  const { addInternship } = useInternshipStore();
  const router = useRouter();

useEffect(() => {
    if (!numEtu) router.back();
  }, [numEtu, router]);

  const onSubmit: SubmitHandler<Internship> = (data) => {
    if (numEtu) addInternship(numEtu, data).then(() => {
      router.push(`/internship/internship-management/?numEtu=${numEtu}&promo=${promo}`);
    });
  };

  return (
    <>
      <TitleHeaderUI label="Ajouter un stage" />
      <div className="p-10 mx-auto">
      <Accordion
        icon={<PersonIcon />}
        name={"Ajouter un stage"}
        open={false}
        data={
          <InternshipForm onSubmit={onSubmit} />
        }
      /></div>
    </>
  );
};

export default PostInternship;