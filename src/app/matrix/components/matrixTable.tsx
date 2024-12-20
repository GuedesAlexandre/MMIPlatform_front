"use client";

import { getModuleStore } from "@/app/store/getAllModules.store";
import { Student } from "@/app/matrix/models/students.model";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect } from "react";
import { groupeUtilsInformation } from "../helper/calculateMatrix";
import { ueModule } from "@/app/matrix/models/ueModule.model";

const TableMatrix = ({
  semester,
  ueName,
  students,
}: {
  semester: string;
  ueName: ueModule;
  students: Student[] | undefined;
}) => {
  const { all_module, fetchModule } = getModuleStore();
  useEffect(() => {
    fetchModule();
  }, []);
  const moduleBySemester = all_module?.filter(
    (module) => module.semester === semester && module.ueName === ueName
  );

  const notes = groupeUtilsInformation(
    students,
    semester,
    moduleBySemester,
    ueName
  );
  console.log(notes);
  return (
    <>
      <TableHeader>
        <TableRow className="overflow-scroll">
          <TableHead>Nom Prénom</TableHead>
          <TableHead>Groupe</TableHead>
          <TableHead>N°Étudiant</TableHead>
          {moduleBySemester?.map((module) => (
            <TableHead className="py-2" key={module.name}>
              {module.name}
            </TableHead>
          ))}
          <TableHead>Moyenne</TableHead>
          <TableHead>Résultat</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moduleBySemester?.map((module) => (
          <TableRow key={module.name}></TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableMatrix;
