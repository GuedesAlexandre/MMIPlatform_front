"use client";

import { useDataStore } from "@/app/store/useDataControlStore";
import { postStudentGrade } from "./postStudentsGrades";
import { useRouter } from "next/navigation";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo";
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

const ITEMS_PER_PAGE = 5;

const Summary = () => {
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
        notes.map((note) =>
          postStudentGrade(
            { coeff: coefficient, note: note.note, name: controlName },
            note.numEtu,
            resource
          )
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
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-5 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {`Éléments ${startItemIndex}-${endItemIndex} sur ${notes.length} (Page ${currentPage} sur ${totalPages})`}
                </span>
                <div>
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={goToPreviousPage}
                    className="mr-4 bg-primary-blue text-background-color hover:text-background-color hover:bg-primary-blue-hover"
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={goToNextPage}
                    className="bg-primary-blue text-background-color hover:text-background-color hover:bg-primary-blue-hover"
                  >
                    Suivant
                  </Button>
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

export default Summary;
