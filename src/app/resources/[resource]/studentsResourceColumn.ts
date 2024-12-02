import { ColumnDef } from "@tanstack/react-table";

export interface StudentTable {
  NumEtu: string;
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  average: number;
}

export const columns: ColumnDef<StudentTable>[] = [
  {
    accessorKey: "NumEtu",
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
    header: "Promotion",
  },
  {
    accessorKey: "group",
    header: "Groupe",
  },
  {
    accessorKey: "average",
    header: "Moyenne",
  },
];
