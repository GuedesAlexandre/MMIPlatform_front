import { Student } from "@/app/matrix/models/students.model";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Student, unknown>[] = [
  {
    accessorKey: "numEtu",
    header: "N° étudiant",
  },
  {
    accessorKey: "lastName",
    header: "Nom",
  },
  {
    accessorKey: "firstName",
    header: "Prénom",
  },
  {
    accessorKey: "promo",
    header: "Promo",
  },
  {
    accessorKey: "group",
    header: "Groupe",
  },
];
