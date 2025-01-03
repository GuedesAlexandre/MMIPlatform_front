"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useRouter, useSearchParams } from "next/navigation";
import StudentCard from "@/app/scolarity/list-absent/components/studentCard";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { useEffect, useState } from "react";
import { Student } from "@/app/resources/models/student.model";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const Page = () => {
  const searchParm = useSearchParams();
  const promo = searchParm.get("promo");

  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  const [absentStudents, setAbsentStudents] = useState<Student[] | undefined>(
    undefined
  );
  const router = useRouter();
  const handleClickChooseStudent = (numEtu: string) => {
    router.push(`/scolarity/missing-list?numEtu=${numEtu}`);
  };
  useEffect(() => {
    if (!promo) return;
    setStudentByPromo(promo);
  }, [promo, setStudentByPromo]);

  useEffect(() => {
    setAbsentStudents(
      studentsByPromo?.filter((student) => {
        return student.notes.some(
          (note) => note.status === "ABS" || note.status === "MAKEUP"
        );
      })
    );
  }, [studentsByPromo]);
  return (
    <>
      <TitleHeaderUI
        label={`Gestion de la scolarité et des absences ${promo}`}
      ></TitleHeaderUI>
      <div
        onClick={() => router.back()}
        className="flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit"
      >
        <ArrowLeftIcon className="size-6 mr-1" />
        <p>Retour</p>
      </div>
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
        <h4 className="py-4 font-bold">
          Liste des étudiants général sans absences ni rattrapage en cours
        </h4>
        <div className="lg:grid lg:grid-cols-4 p-6 md:grid md:grid-cols-3 flex flex-col gap-3">
          {studentsByPromo &&
            studentsByPromo.map((student) => (
              <a key={student.numEtu}>
                <StudentCard
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
