'use client';
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { Student } from "@/app/matrix/models/students.model";
import { studentsStore } from "@/app/store/student.store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MissingListTable from "./components/MissingListTable";
import { Note } from "@/app/resources/models/student.model";
import { set } from "react-hook-form";

const MissingList = () => {
  const searchParm = useSearchParams();
  const numEtu = searchParm.get("numEtu");
  const { students, setStudentsData } = studentsStore();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [missingList, setMissingList] = useState<Note[] | undefined>(undefined);

  useEffect(() => {
    setStudentsData().then((data) => {
      const student = data?.find((student: Student) => student.numEtu === numEtu);
      setStudent(student);
    });
  }, [numEtu, setStudentsData]);
    return (
        <>
        <TitleHeaderUI
            label={`Gestion des absences de l'étudiant ${student?.lastName ?? ''} ${student?.firstName ?? ''}`}
        />
        <div className="p-6">
            <h4 className="font-bold py-4">Liste des absences</h4>
            {student && (
            <MissingListTable notes={student.notes} lastName={student.lastName} numEtu={student.numEtu}/>
            )}
        </div>
        </>
    );
};

export default MissingList;