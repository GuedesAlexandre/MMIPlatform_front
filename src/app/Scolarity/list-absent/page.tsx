"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useRouter, useSearchParams } from "next/navigation";
import StudentCard from "./components/studentCard";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { useEffect, useState } from "react";
import { Student } from "@/app/resources/models/student.model";

const Page = () => {
  const searchParm = useSearchParams();
  const promo = searchParm.get("promo");

  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  const [absentStudents, setAbsentStudents] = useState<Student[] | undefined>(
    undefined
  );
  const router = useRouter();
  const handleClickChooseStudent = (numEtu: string) => {
    router.push(`/Scolarity/missing-list?numEtu=${numEtu}`);
  };
  useEffect(() => {
    if (!promo) return;
    setStudentByPromo(promo);
    setAbsentStudents(
      studentsByPromo?.filter((student) => {
        return student.notes.some(
          (note) => note.status === "ABS" || note.status === "MAKEUP"
        );
      })
    );
  }, [promo, setStudentByPromo, studentsByPromo]);

  return (
    <>
      <TitleHeaderUI
        label={`Gestion de la scolarité et des absences ${promo}`}
      ></TitleHeaderUI>
      <div className="p-6">
        <h4 className="font-bold py-4 ">
          Liste des étudiants possédant des absences ou des rattrapages en cours
        </h4>
        <div className="lg:grid lg:grid-cols-4 gap-4 p-6">
          {absentStudents && absentStudents.length > 0 ? (
            absentStudents.map((student) => (
              <a
                key={student.numEtu}
                onClick={() => handleClickChooseStudent(student.numEtu)}
              >
                <StudentCard
                  lastName={student.lastName}
                  firstName={student.firstName}
                  group={student.group}
                />
              </a>
            ))
          ) : (
            <span className="w-auto !block">
              Aucun étudiant avec des absences dans des évaluations ou des
              rattrapages en cours.
            </span>
          )}
        </div>
        <hr></hr>
        <h4 className="py-4 font-bold">Liste des étudiants général</h4>
        <div className="lg:grid lg:grid-cols-4 p-6 md:grid md:grid-cols-3 flex  flex-col gap-3">
          {studentsByPromo &&
            studentsByPromo.map((student) => (
              <a>
                <StudentCard
                  key={student.numEtu}
                  lastName={student.lastName}
                  firstName={student.firstName}
                  group={student.group}
                />
              </a>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;