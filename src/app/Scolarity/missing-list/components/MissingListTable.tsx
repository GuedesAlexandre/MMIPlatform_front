"use client";
import { putStudentGrade } from "@/app/resources/[resource]/control/summary/putStudentGrades";
import { Note } from "@/app/resources/models/student.model";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import React, { useState } from "react";

interface MissingListTableProps {
  notes?: Note[];
  numEtu?: string;
  lastName?: string;
}

const MissingListTable: React.FC<MissingListTableProps> = ({
  notes,
  numEtu,
  lastName,
}) => {
const [errorHandler, setErrorHandler] = useState<boolean>(false);
const handlePutStudentGrade = (
  data: { coeff: number; note: number; name: string; status: string },
  numEtu: string,
  resource: string,
  lastname: string | null
) => {
  try{
  putStudentGrade(data, numEtu, resource, lastname).then(() => {
    window.location.reload();
  });
  }
  catch(error){
    console.error(error);
    setErrorHandler(true);
  }
};
  return (
    <>
      <Alert className="my-4 border-green-400">
        <Info className="size-4" />
        <AlertTitle>Informations sur les status</AlertTitle>
        <AlertDescription>
          Chaque note possède un statut qui peut être :
          <br />- <span className="font-bold">ABS</span> : Absent
          <br />- <span className="font-bold">DEF</span> : Défaillant
          <br />- <span className="font-bold">MAKEUP</span> : Rattrapage
          <br />
          <span>
            Vous pouvez valider un rattrapage en cliquant sur le bouton
            &quot;Valider&quot;. A partir de ce moment l&apos;étudiant peut bénéficier d&apos;une
            nouvelle note pour l&apos;évalutation lors d&apos;une session de rattrapage
          </span>
        </AlertDescription>
      </Alert>

      {errorHandler && (
        <Alert className="my-4 border-red-400">
          <Info className="size-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Une erreur est survenue lors de la validation du rattrapage
            </AlertDescription>
            </Alert>
            )}

      <Table className="table-auto min-w-full border">
        <TableHeader>
          <TableRow className="overflow-scroll">
            <TableHead className="min-w-32">Nom de l&apos;évaluation</TableHead>
            <TableHead className="min-w-32">Module</TableHead>
            <TableHead className="min-w-32">Note obtenue</TableHead>
            <TableHead className="min-w-32">Coefficient</TableHead>
            <TableHead className="min-w-32">Statut</TableHead>
            <TableHead className="min-w-32">Valider un rattrapage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes
            ?.filter(
              (note) =>
                note.status === "ABS" ||
                note.status === "MAKEUP" ||
                note.status === "DEF"
            )
            .map((note) => (
              <TableRow key={note.name}>
                <TableCell>{note.name}</TableCell>
                <TableCell>{note.module.name}</TableCell>
                <TableCell>{note.note}</TableCell>
                <TableCell>{note.coeff}</TableCell>
                <TableCell>{note.status}</TableCell>
                <TableCell>
                  {note.status === "MAKEUP" ? (
                    <span>Rattrapage en cours</span>
                  ) : (
                    <button
                      className="bg-green-500 text-white rounded-md p-2"
                      onClick={() =>
                        handlePutStudentGrade(
                          {
                            coeff: note.coeff,
                            note: note.note,
                            name: note.name,
                            status: "MAKEUP",
                          },
                          numEtu as string,
                          note.module.name,
                          note.name as string
                        )
                      }
                    >
                      Valider
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MissingListTable;
