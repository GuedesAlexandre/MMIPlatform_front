'Use Client'

import {
  SignatureStatusEnum,
  SignatureStudentData,
} from '@/app/presence/models/signature.model'
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends SignatureStudentData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })
  const router = useRouter()
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const pageSize = table.getState().pagination.pageSize
  const totalRows = table.getCoreRowModel().rows.length
  const startRow = (currentPage - 1) * pageSize + 1
  const endRow = Math.min(currentPage * pageSize, totalRows)

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
                <TableHead>Action</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                    <TableCell className='flex w-fit gap-2'>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {row.original.sign === SignatureStatusEnum.ABS && (
                            <button
                              className='
                            px-4 py-2 text-white bg-primary-blue rounded-md hover:bg-blue-800 transition
                            '
                            >
                              Justifier
                            </button>
                          )}
                        </AlertDialogTrigger>

                        <AlertDialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                          <div className='bg-white rounded-lg shadow-lg w-full max-w-xl'>
                            <div className='p-6'>
                              <AlertDialogHeader>
                                <AlertDialogTitle className='text-lg font-semibold text-gray-800'>
                                  Êtes-vous sûr de vouloir justifier l'absence
                                  de {row.original.studentWhoSign.firstName}{' '}
                                  {row.original.studentWhoSign.lastName}
                                </AlertDialogTitle>
                                <AlertDialogDescription className='mt-2 text-sm text-gray-600'>
                                  Une fois validée, cette action sera
                                  irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter className='mt-6 flex justify-end space-x-3'>
                                <AlertDialogCancel className='px-4 py-2 text-white bg-danger rounded-md hover:bg-red-700 transition'>
                                  Non, annuler
                                </AlertDialogCancel>
                                <AlertDialogAction className='px-4 py-2 text-white bg-success rounded-md hover:bg-success-hover transition'>
                                  Oui, justifier
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </div>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 text-center'
                >
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {(table.getCanPreviousPage() || table.getCanNextPage()) && (
        <div className='flex items-center justify-between py-4'>
          <div className='text-sm text-gray-600'>
            {`Éléments ${startRow}-${endRow} sur ${totalRows} (Page ${currentPage} sur ${totalPages})`}
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='bg-primary-blue text-background-color hover:bg-primary-blue-hover hover:text-background-color'
            >
              Précédent
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='bg-primary-blue text-background-color hover:bg-primary-blue-hover hover:text-background-color'
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default DataTable
