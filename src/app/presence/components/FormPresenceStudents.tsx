'use client'

import { Button } from '@/components/ui/button'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Student } from '@/app/matrix/models/students.model'
import {
  SignatureStatusEnum,
  SignatureStudentData,
} from '@/app/presence/models/signature.model'
import { useState, useEffect } from 'react'
import ButtonsUI from '@/app/components/ui/ButtonsUI'
import { useStudentsSignatureStore } from '@/app/store/presence.store'
import { JustificationStatusEnum } from '@/app/presence/models/signature.model'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Student, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [signatureStudents, setSignatureStudents] = useState<
    SignatureStudentData[]
  >([])

  const { studentsSignatures, createSheetStudent, resetStudentsSignatures } =
    useStudentsSignatureStore()

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if (!data) return
    const initialSignatures = data.map((student) => ({
      studentWhoSign: student,
      sign: SignatureStatusEnum.NONE,
      justification: JustificationStatusEnum.NOT_JUSTIFIED,
    }))
    setSignatureStudents(initialSignatures)
  }, [data])

  const handleInputChange = (
    numEtu: string,
    presentOrAbsent: 'present' | 'absent',
  ) => {
    const newSignatureStudents = signatureStudents.map((student : SignatureStudentData) => {
      if (student.studentWhoSign.numEtu === numEtu) {
        return {
          ...student,
          justification:
            presentOrAbsent === 'present'
              ? JustificationStatusEnum.JUSTSIGNED
              : JustificationStatusEnum.NOT_JUSTIFIED,
          sign:
            presentOrAbsent === 'present'
              ? SignatureStatusEnum.PRESENT
              : SignatureStatusEnum.ABS,
        }
      }
      return student
    })
    setSignatureStudents(newSignatureStudents)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoad(true)
    if (!studentsSignatures) return
    createSheetStudent(
      studentsSignatures.students,
      studentsSignatures.promo,
      studentsSignatures.moduleName,
      studentsSignatures.createdAt,
      studentsSignatures.finishAt,
      signatureStudents,
    ).then(() => {
      setIsLoad(false)
    })
  }

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

  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const pageSize = table.getState().pagination.pageSize
  const totalRows = table.getCoreRowModel().rows.length
  const startRow = (currentPage - 1) * pageSize + 1
  const endRow = Math.min(currentPage * pageSize, totalRows)

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
                <TableHead>État</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const student = row.original
                const selectedStudent = signatureStudents.find(
                  (s) => s.studentWhoSign.numEtu === student.numEtu,
                )
                const isPresent =
                  selectedStudent?.sign === SignatureStatusEnum.PRESENT
                const isAbsent =
                  selectedStudent?.sign === SignatureStatusEnum.ABS
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
                      <label
                        className={`p-1 px-5 w-fit border rounded cursor-pointer transition-colors text-center ${
                          isPresent
                            ? 'bg-success text-white'
                            : 'hover:bg-green-100'
                        }`}
                      >
                        <input
                          type='radio'
                          name={`attendance-${student.numEtu}`}
                          value='present'
                          className='hidden'
                          onChange={() =>
                            handleInputChange(student.numEtu, 'present')
                          }
                        />
                        Présent
                      </label>
                      <label
                        className={`p-1 px-5 w-fit border rounded cursor-pointer transition-colors text-center ${
                          isAbsent ? 'bg-danger text-white' : 'hover:bg-red-100'
                        }`}
                      >
                        <input
                          type='radio'
                          name={`attendance-${student.numEtu}`}
                          value='absent'
                          className='hidden'
                          onChange={() =>
                            handleInputChange(student.numEtu, 'absent')
                          }
                        />
                        Absent
                      </label>
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

      <form onSubmit={handleSubmit}>
        <div className='flex justify-end gap-4 py-4'>
          {!isLoad && (
            <ButtonsUI
              type='button'
              label='Réinitialiser'
              customClassName='mt-5 mr-5 border border-black hover:bg-neutral-100 transition-colors duration-300'
              onClick={() => resetStudentsSignatures()}
            />
          )}
          {isLoad ? (
            <div className='flex items-center justify-center mt-5'>
              <div className='size-9 border-4 border-t-blue-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <ButtonsUI
              type='submit'
              label='Envoyer la feuille'
              customClassName='mt-5'
            />
          )}
        </div>
      </form>
    </div>
  )
}
