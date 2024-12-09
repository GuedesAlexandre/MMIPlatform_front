import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export interface ModuleTable {
  id?: string;
  promo: string;
  semester: string;
  resourceName: string;
}

export const columns: ColumnDef<ModuleTable>[] = [
  {
    id: "Select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "promo",
    header: "Promo",
  },
  {
    accessorKey: "semester",
    header: "Semestre",
  },
  {
    accessorKey: "resourceName",
    header: "Nom de la ressource",
  },
];
