"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useSearchParams } from "next/navigation";
import StudentCard from "./components/studentCard";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { useEffect } from "react";

const Page = () => {
  const searchParm = useSearchParams();
  const promo = searchParm.get("promo");

  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  useEffect(() => {
    if (!promo) return;
    setStudentByPromo(promo);
  }, []);
  console.log(studentsByPromo);
  return (
    <>
      <TitleHeaderUI
        label={`Gestion de la scolarité et des absences ${promo}`}
      ></TitleHeaderUI>

      <div className="grid grid-cols-4 gap-4 p-6">
        {studentsByPromo &&
          studentsByPromo.map((student) => (
            <StudentCard
              lastName={student.lastName}
              firstName={student.firstName}
            />
          ))}
      </div>
    </>
  );
};

export default Page;
