"use client";

import { getModuleStore } from "@/app/store/getAllModules.store";
import { Student } from "@/app/matrix/models/students.model";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { groupeUtilsInformation } from "@/app/matrix/helper/calculateMatrix";
import { ueModule } from "@/app/matrix/models/ueModule.model";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Module } from "@/app/users/models/user.model";

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
  const [moduleBySemester, setModuleBySemester] = useState<
    Module[] | undefined
  >([]);

  useEffect(() => {
    fetchModule();
  }, []);

  useEffect(() => {
    if (ueName === "synthese") {
      setModuleBySemester(
        all_module?.filter((module) => module.semester === semester)
      );
    } else {
      setModuleBySemester(
        all_module?.filter(
          (module) => module.semester === semester && module.ueName === ueName
        )
      );
    }
  }, [ueName, semester, students]);

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
            <TableHead className="min-w-48">Nom Prénom</TableHead>
            <TableHead className="min-w-32">Groupe</TableHead>
            <TableHead className="min-w-32">N°Étudiant</TableHead>
            {ueName === "synthese" ? (
              <>
                <TableHead className="py-2 min-w-40">UE Entreprendre</TableHead>
                <TableHead className="py-2 min-w-40">UE Développer</TableHead>
                {!(semester === "5" || semester === "6") && (
                  <>
                    <TableHead className="py-2 min-w-40">
                      UE Comprendre
                    </TableHead>
                    <TableHead className="py-2 min-w-40">
                      UE Concevoir
                    </TableHead>
                    <TableHead className="py-2 min-w-40">UE Exprimer</TableHead>
                  </>
                )}
              </>
            ) : (
              moduleBySemester?.map((module, key) => (
                <TableHead
                  className="py-2 min-w-32"
                  key={`${module.name} - ${key}`}
                >
                  {module.name}
                </TableHead>
              ))
            )}
            <TableHead className="min-w-32">Moyenne</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentNotes.map((note) => (
            <TableRow key={note.IdStudent}>
              <TableCell>{note.name}</TableCell>
              <TableCell>{note.group}</TableCell>
              <TableCell>{note.IdStudent}</TableCell>
              {ueName === "synthese" ? (
                <>
                  <TableCell
                    className={
                      note.notes["UE_ENTREPRENDRE"] >= 7
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {note.notes["UE_ENTREPRENDRE"] !== undefined
                      ? note.notes["UE_ENTREPRENDRE"].toFixed(2)
                      : 0}
                  </TableCell>
                  <TableCell
                    className={
                      note.notes["UE_DEVELOPPER"] >= 7
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {note.notes["UE_DEVELOPPER"] !== undefined
                      ? note.notes["UE_DEVELOPPER"].toFixed(2)
                      : 0}
                  </TableCell>
                  {!(semester === "5" || semester === "6") && (
                    <>
                      <TableCell
                        className={
                          note.notes["UE_COMPRENDRE"] >= 7
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {note.notes["UE_COMPRENDRE"] !== undefined
                          ? note.notes["UE_COMPRENDRE"].toFixed(2)
                          : 0}
                      </TableCell>
                      <TableCell
                        className={
                          note.notes["UE_CONCEVOIR"] >= 7
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {note.notes["UE_CONCEVOIR"] !== undefined
                          ? note.notes["UE_CONCEVOIR"].toFixed(2)
                          : 0}
                      </TableCell>
                      <TableCell
                        className={
                          note.notes["UE_EXPRIMER"] >= 7
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {note.notes["UE_EXPRIMER"] !== undefined
                          ? note.notes["UE_EXPRIMER"].toFixed(2)
                          : 0}
                      </TableCell>
                    </>
                  )}
                </>
              ) : (
                moduleBySemester?.map((module, key) => (
                  <TableCell
                    key={`${module.name} - ${key}`}
                    className={
                      note.notes[module.name] >= 7
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {note.notes[module.name] !== undefined
                      ? note.notes[module.name].toFixed(2)
                      : "-"}
                  </TableCell>
                ))
              )}
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
