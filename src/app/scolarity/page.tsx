"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useEffect, useState } from "react";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import PromoCard from "@/app/scolarity/components/PromoCard";

export default function Page() {
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  const [CountMMI01, setCountMMI01] = useState<number | undefined>(undefined);
  const [CountMMI02, setCountMMI02] = useState<number | undefined>(undefined);
  const [CountMMI03, setCountMMI03] = useState<number | undefined>(undefined);

  useEffect(() => {
    document.title = "Gestion de la scolarité et des absences";
    setStudentByPromo("MMI01");
    setCountMMI01(studentsByPromo?.length);
    setStudentByPromo("MMI02");
    setCountMMI02(studentsByPromo?.length);
    setStudentByPromo("MMI03");
    setCountMMI03(studentsByPromo?.length);
  }, [setStudentByPromo]);
  return (
    <>
      <TitleHeaderUI
        label={"Gestion de la scolarité et des absences"}
      ></TitleHeaderUI>
      <div className="px-10">
        <div className="flex justify-center items-center">
          <h3>Séléctionnez une promotion</h3>
        </div>
        <div className="flex justify-center gap-8">
          <PromoCard title="MMI01" number={CountMMI01} color="red"></PromoCard>
          <PromoCard title="MMI02" number={CountMMI02} color="red"></PromoCard>
          <PromoCard title="MMI03" number={CountMMI03} color="red"></PromoCard>
        </div>
      </div>
    </>
  );
}
