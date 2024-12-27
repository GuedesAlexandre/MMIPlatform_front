"use client";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { Student } from "@/app/matrix/models/students.model";
import { studentsStore } from "@/app/store/student.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MissingListTable from "@/app/scolarity/missing-list/components/MissingListTable";
import { Note } from "@/app/resources/models/student.model";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const MissingList = () => {
  const searchParm = useSearchParams();
  const numEtu = searchParm.get("numEtu");
  const { students, setStudentsData } = studentsStore();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [missingList, setMissingList] = useState<Note[] | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setStudentsData().then((data) => {
      const student = data?.find(
        (student: Student) => student.numEtu === numEtu
      );
      setStudent(student);
    });
  }, [numEtu, setStudentsData]);
  return (
    <>
      <TitleHeaderUI
        label={`Gestion des absences de l'étudiant ${student?.lastName ?? ""} ${
          student?.firstName ?? ""
        }`}
      />
      <div
        onClick={() => router.back()}
        className="flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit"
      >
        <ArrowLeftIcon className="size-6 mr-1" />
        <p>Retour</p>
      </div>
      <div className="p-6">
        <h4 className="font-bold py-4">Liste des absences</h4>
        {student && (
          <MissingListTable
            notes={student.notes}
            lastName={student.lastName}
            numEtu={student.numEtu}
          />
        )}
      </div>
    </>
  );
};

export default MissingList;
