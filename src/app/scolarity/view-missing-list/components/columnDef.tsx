import { SignatureStudentData } from '@/app/presence/models/signature.model'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<SignatureStudentData>[] = [
  {
    accessorKey: 'lastName',
    header: 'Nom',
    cell: ({ row }) => {
      return row.original.studentWhoSign.lastName
    },
  },
  {
    accessorKey: 'fisrtName',
    header: 'Prénom',
    cell: ({ row }) => {
      return row.original.studentWhoSign.firstName
    },
  },
  {
    accessorKey: 'group',
    header: 'Groupe',
    cell: ({ row }) => {
      return row.original.studentWhoSign.group
    },
  },
  {
    accessorKey: 'sign',
    header: 'Signature',
  },
]
