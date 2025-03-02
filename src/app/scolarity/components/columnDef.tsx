import {
  SignatureSheet,
  SignatureStatusEnum,
} from '@/app/presence/models/signature.model'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<SignatureSheet>[] = [
  {
    accessorKey: 'moduleName',
    header: 'cours',
  },
  {
    accessorKey: 'finishAt',
    header: 'horaires',
    cell: ({ row }) => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
      }

      const start = new Date(row.original.createdAt).toLocaleTimeString(
        undefined,
        options,
      )
      const end = new Date(row.original.finishAt).toLocaleTimeString(
        undefined,
        options,
      )
      return `${start} - ${end}`
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString()
      return date
    },
  },
  {
    accessorKey: 'numberStudents',
    header: "Nombres d'étudiants",
    cell: ({ row }) => {
      return row.original.students.length
    },
  },
  {
    accessorKey: 'numberStudentsAbsents',
    header: "Nombres d'étudiants absents",
    cell: ({ row }) => {
      return row.original.signatures?.filter(
        (signature) => signature.sign === SignatureStatusEnum.ABS,
      ).length
    },
  },
]
