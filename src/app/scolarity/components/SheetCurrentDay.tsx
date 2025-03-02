import { SignatureSheet } from '@/app/presence/models/signature.model'
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
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { MoveRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends SignatureSheet, TValue>({
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

  const handleClickNavigation = (
    moduleName: string,
    promo: string,
    createdAt: Date,
    finishAt: Date,
  ) => {
    router.push(
      `/scolarity/view-missing-list?moduleName=${moduleName}&promo=${promo}&createAt=${createdAt}&finishAt=${finishAt}`,
    )
  }

  return (
    <div>
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
                      <div
                        className='flex gap-2 cursor-pointer transition-colors text-gray-600 hover:text-gray-800 group-hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        onClick={() =>
                          handleClickNavigation(
                            row.original.moduleName,
                            row.original.promo,
                            row.original.createdAt,
                            row.original.finishAt,
                          )
                        }
                      >
                        Voir Plus <MoveRightIcon strokeWidth={1} />
                      </div>
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
    </div>
  )
}

export default DataTable
