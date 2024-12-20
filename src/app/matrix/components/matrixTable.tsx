"use client";

import { getModuleStore } from "@/app/store/getAllModules.store";
import { Student } from "@/app/matrix/models/students.model";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Table
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { groupeUtilsInformation } from "../helper/calculateMatrix";
import { ueModule } from "@/app/matrix/models/ueModule.model";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);

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

  const totalRows = notes.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentNotes = notes.slice(startIndex, startIndex + rowsPerPage);

  const startItemIndex = (currentPage - 1) * rowsPerPage + 1;
  const endItemIndex = Math.min(startItemIndex + rowsPerPage - 1, notes.length);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Table className="table-auto min-w-full border">
        <TableHeader>
          <TableRow className="overflow-scroll">
            <TableHead className="min-w-32">Nom Prénom</TableHead>
            <TableHead className="min-w-32">Groupe</TableHead>
            <TableHead className="min-w-32">N°Étudiant</TableHead>
            {moduleBySemester?.map((module) => (
              <TableHead className="py-2 min-w-32" key={module.name}>
                {module.name}
              </TableHead>
            ))}
            <TableHead className="min-w-32">Moyenne</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentNotes.map((note) => (
            <TableRow key={note.IdStudent}>
              <TableCell>{note.name}</TableCell>
              <TableCell>{note.group}</TableCell>
              <TableCell>{note.IdStudent}</TableCell>
              {moduleBySemester?.map((module) => (
                <TableCell 
                key={module.name} 
                className={
                  note.notes[module.name] > 5 ? "text-success" : "text-danger"
                }>
                  {note.notes[module.name] !== undefined
                    ? note.notes[module.name]
                    : "-"}
                </TableCell>
              ))}
              <TableCell>{note.average.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {moduleBySemester && notes.length === 0 && (
            <TableRow>
              <TableCell colSpan={moduleBySemester?.length + 4}>
                Aucune note trouvée pour ce semestre et cette UE.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {notes.length !== 0 && (
        <div className="flex items-center flex-wrap mt-4">
          <span className="text-sm text-gray-600">
            {`Éléments ${startItemIndex}-${endItemIndex} sur ${notes.length} (Page ${currentPage} sur ${totalPages})`}
          </span>
          <div className="flex flex-row ml-20">
            <div
              className={
                currentPage === 1
                  ? "flex flex-row items-center mr-5 text-placeholder-color select-none"
                  : "flex flex-row items-center cursor-pointer hover:underline mr-5 select-none"
              }
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ArrowLeftIcon className="size-5 mr-1" />
              <p>Précédent</p>
            </div>
            <p className="mr-5">|</p>
            <div
              className={
                currentPage === totalPages
                  ? "flex flex-row items-center mr-5 text-placeholder-color select-none"
                  : "flex flex-row items-center cursor-pointer hover:underline mr-5 select-none"
              }
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <p>Suivant</p>
              <ArrowRightIcon className="size-5 ml-1" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableMatrix;
