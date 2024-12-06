import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDataStore } from "@/app/store/useDataControlStore";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Student {
  numEtu: string;
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  note?: number;
}

const ITEMS_PER_PAGE = 5;

const TableNotes = ({
  data,
  resource,
}: {
  data: Student[];
  resource: string | null;
}) => {
  const [notes, setNotes] = useState<{ numEtu: string; note?: number }[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const controlName = useDataStore((state) => state.controlName);
  const coefficient = useDataStore((state) => state.coefficient);
  const setControlName = useDataStore((state) => state.setControlName);
  const setCoefficient = useDataStore((state) => state.setCoefficient);
  const setNotesStore = useDataStore((state) => state.setNotes);
  const setResource = useDataStore((state) => state.setResource);
  const router = useRouter();

  useEffect(() => {
    setNotes(
      data.map((student) => ({ numEtu: student.numEtu, note: undefined }))
    );
    setResource(resource);
    setControlName("");
    setCoefficient(1);
  }, [data, resource, setResource, setCoefficient, setControlName]);

  const updateNote = (numEtu: string, newNote?: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((item) =>
        item.numEtu === numEtu ? { ...item, note: newNote } : item
      )
    );
  };

  const areAllNotesFilled = notes.every((item) => item.note !== undefined);

  const logNotes = () => {
    if (areAllNotesFilled && controlName !== "") {
      const filledNotes = notes.map((item) => ({
        numEtu: item.numEtu,
        note: item.note as number,
      }));
      setNotesStore(filledNotes);
      router.push(`control/summary`);
    }
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const getPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startItemIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemIndex = Math.min(
    startItemIndex + ITEMS_PER_PAGE - 1,
    data.length
  );

  return (
    <div className="pb-10 pt-1">
      <div className="flex flex-row gap-4 mb-4">
        <div className="flex flex-col w-2/5">
          <Label htmlFor="controlName">Nom du contrôle</Label>
          <Input
            id="controlName"
            type="text"
            placeholder="Nom du contrôle"
            value={controlName}
            onChange={(e) => setControlName(e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <Label htmlFor="coefficient">Coefficient</Label>
          <Input
            id="coefficient"
            type="number"
            placeholder="Coefficient"
            value={coefficient}
            onChange={(e) => setCoefficient(Number(e.target.value))}
            className="mt-2"
          />
        </div>
      </div>
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
          {getPageData().map((student) => (
            <TableRow key={student.numEtu}>
              <TableCell>{student.numEtu}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.promo}</TableCell>
              <TableCell>{student.group}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Note"
                  value={
                    notes.find((item) => item.numEtu === student.numEtu)
                      ?.note ?? ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (Number(value) >= 0 && Number(value) <= 20) {
                      updateNote(
                        student.numEtu,
                        value === "" ? undefined : Number(value)
                      );
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          {`Éléments ${startItemIndex}-${endItemIndex} sur ${data.length} (Page ${currentPage} sur ${totalPages})`}
        </span>
        <div>
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            className="mr-4 bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mt-4"
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
            className="bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mt-4"
          >
            Suivant
          </Button>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => router.back()}
          className="mr-5 px-16 bg-danger text-background-color hover:bg-neutral-900 hover:text-background-color"
        >
          Annuler
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={logNotes}
          disabled={!areAllNotesFilled}
          className="bg-[#00936E] hover:bg-[#006d51] text-background-color hover:text-background-color px-16"
        >
          Valider
        </Button>
      </div>
    </div>
  );
};

export default TableNotes;
