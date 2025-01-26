import React, { useState } from "react";
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from "@/components/ui/table";
import { Student } from "@/app/resources/models/student.model";

interface DataTableProps {
    studentsByPromo: Student[];
}

const DataStudentTable: React.FC<DataTableProps> = ({ studentsByPromo }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const studentsPerPage = 10;

    const filteredStudents = studentsByPromo.filter((student) =>
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.numEtu.toString().includes(searchQuery)
    );

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="rounded-md border">
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Numéro Étudiant</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Promo</TableHead>
                        <TableHead>Groupe</TableHead>
                        <TableHead>Gestion des stages</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentStudents.map((student) => (
                        <TableRow key={student.numEtu}>
                            <TableCell>{student.numEtu}</TableCell>
                            <TableCell>{student.lastName}</TableCell>
                            <TableCell>{student.firstName}</TableCell>
                            <TableCell>{student.promo}</TableCell>
                            <TableCell>{student.group}</TableCell>
                            <TableCell>
                                <button className="px-4 py-2 bg-primary text-white rounded">
                                    Gérer
                                </button>
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

export default DataStudentTable;
