"use client";

import { useDataStore } from "@/app/store/useDataControl.store";
import { postStudentGrade } from "@/app/resources/[resource]/control/summary/postStudentsGrades";
import { useRouter } from "next/navigation";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const ITEMS_PER_PAGE = 5;

const Summary = () => {
  const statut = useDataStore((state) => state.statut);
  const notes = useDataStore((state) => state.notes);
  const controlName = useDataStore((state) => state.controlName);
  const coefficient = useDataStore((state) => state.coefficient);
  const resource = useDataStore((state) => state.resource);
  const { studentsByPromo } = useStudentsByPromo();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(notes.length / ITEMS_PER_PAGE);

  const getPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return notes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const sendNotes = async () => {
    try {
      if (resource) {
        notes.map((note) => {
          const statutNote = String(statut.find((item) => item.numEtu === note.numEtu)?.status);
          postStudentGrade(
            { coeff: coefficient, note: note.note, name: controlName, status: statutNote},
            note.numEtu,
            resource
          )
        }
        );
        router.push("/resources");
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi des notes", err);
    }
  };

  const getStudentInfo = (numEtu: string) => {
    return (
      studentsByPromo?.find((student) => student.numEtu === numEtu) || null
    );
  };

  const startItemIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemIndex = Math.min(
    startItemIndex + ITEMS_PER_PAGE - 1,
    notes.length
  );

  return (
    <>
      <TitleHeaderUI label={`Récapitulatif du contrôle : ${controlName}`} />
      <div className="px-10">
        <p>
          <strong>Nom du contrôle : </strong>
          {controlName || "Non renseigné"}
        </p>
        <p>
          <strong>Coefficient : </strong>
          {coefficient || "Non renseigné"}
        </p>
        <p>
          <strong>Ressource associée : </strong>
          {resource || "Non renseignée"}
        </p>
        <div className="mt-5 mb-10">
          {notes.length > 0 ? (
            <>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>N° étudiant</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Promo</TableHead>
                    <TableHead>Groupe</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPageData().map((note) => {
                    const studentInfo = getStudentInfo(note.numEtu);
                    return (
                      <TableRow key={note.numEtu}>
                        <TableCell>{note.numEtu}</TableCell>
                        <TableCell>{studentInfo?.lastName}</TableCell>
                        <TableCell>{studentInfo?.firstName}</TableCell>
                        <TableCell>{studentInfo?.promo}</TableCell>
                        <TableCell>{studentInfo?.group}</TableCell>
                        <TableCell>
                          {note.note !== undefined && note.note}
                        </TableCell>
                        <TableCell>
                          {replaceStatut(
                            statut.find((item) => item.numEtu === note.numEtu)
                              ?.status
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-5 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {`Éléments ${startItemIndex}-${endItemIndex} sur ${notes.length} (Page ${currentPage} sur ${totalPages})`}
                </span>
                <div className="flex flex-row">
                  <div
                    className={
                      currentPage === 1
                        ? "flex flex-row items-center mr-5 text-placeholder-color select-none"
                        : "flex flex-row items-center cursor-pointer hover:underline mr-5 select-none"
                    }
                    onClick={goToPreviousPage}
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
                    onClick={goToNextPage}
                  >
                    <p>Suivant</p>
                    <ArrowRightIcon className="size-5 ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button
                  className="px-10 py-4 bg-danger text-background-color hover:text-background-color hover:bg-neutral-900 rounded mr-5"
                  onClick={() => router.back()}
                  variant={"outline"}
                  size={"lg"}
                >
                  Annuler
                </Button>
                <Button
                  className="px-10 py-4 bg-[#00936E] hover:bg-[#006d51] text-background-color hover:text-background-color rounded"
                  onClick={sendNotes}
                  variant={"outline"}
                  size={"lg"}
                >
                  Enregistrer les notes
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              Aucune note n&apos;a été enregistrée.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export const replaceStatut = (statut: string | undefined) => {
  switch (statut) {
    case "ABS":
      return "Absent";
    case "DEF":
      return "Défaillant";
    case "DONE":
      return "Valide";
    default:
      return statut;
  }
};

export default Summary;
