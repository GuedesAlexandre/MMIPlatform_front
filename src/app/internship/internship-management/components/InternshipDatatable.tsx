import { InternshipStudent } from "@/app/models/Internship";
import { useInternshipStore } from "@/app/store/Internship.store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DataTableInternshipProps {
  studentInterships: InternshipStudent;
}

const InternshipDatatable: React.FC<DataTableInternshipProps> = ({
  studentInterships,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(studentInterships?.internships.length / 10);
  const { deleteInternship } = useInternshipStore();
  const router = useRouter();

  const handleRedirectAddPage = () => {
    router.push(`../internship/add-internship/?numEtu=${studentInterships.numEtu}`);
  }

  const handleDeleteInternship = (
    numEtu: string,
    years: number,
    title: string
  ) => {
    try{
      deleteInternship(numEtu, years, title)
    } catch (error) {
        console.error("Erreur lors de la suppression du stage :", error);
      }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage: number) => Math.min(prevPage + 1, totalPages));
  };

  

  const filteredInternships = studentInterships?.internships.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <div className="flex justify-end px-4 py-3">
        <button className="px-4 py-2 my-2 bg-primary-blue rounded text-white disabled:opacity-50" onClick={handleRedirectAddPage}>
          Déclarer un stage ou une alternance
        </button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Intitulé de la période professionnelle</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Année du stage</TableHead>
            <TableHead>Nombre de semaines effectuées</TableHead>
            <TableHead>Commentaires</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInternships?.map((student) => (
            <TableRow key={student.title}>
              <TableCell>{student.title}</TableCell>
              <TableCell>{student.type}</TableCell>
              <TableCell>{student.years}</TableCell>
              <TableCell>{student.weekCount}</TableCell>
              <TableCell>{student?.comment}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-primary text-white rounded">
                    Modifier
                  </button>
                  <button
                    className="px-4 py-2 bg-danger text-white rounded"
                    onClick={() =>
                      handleDeleteInternship(
                        studentInterships.numEtu,
                        student.years,
                        student.title
                      )
                    }
                  >
                    Supprimer
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between p-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-success rounded text-white disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default InternshipDatatable;
