import { InternshipStudent } from "@/app/models/Internship";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const filteredInternships = studentInterships?.internships.filter((internship) =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div className="rounded-md border">
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
                  <button className="px-4 py-2 bg-danger text-white rounded">
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
