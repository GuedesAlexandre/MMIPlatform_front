'use client'

import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { storeSheet } from '@/app/store/Sheets.store'
import DataTable from '@/app/scolarity/view-missing-list/components/DataTableAbsentsStudent'
import { columns } from '@/app/scolarity/view-missing-list/components/columnDef'

const Page = () => {
  const searchParams = useSearchParams()
  const moduleName = searchParams.get('moduleName')
  const promo = searchParams.get('promo')
  const createAt = searchParams.get('createAt')
  const finishAt = searchParams.get('finishAt')
  const {
    setSignatureSheetDetail,
    studentSignatureSheet: StudentSignatureSheet,
  } = storeSheet()

  useEffect(() => {
    if (!moduleName || !promo || !createAt || !finishAt) return
    setSignatureSheetDetail(moduleName, promo, createAt, finishAt)
  }, [])

  return (
    <>
      <TitleHeaderUI label={`Détail de la feuille de présence ${moduleName}`} />
      <div className='px-10'>
        <DataTable
          columns={columns}
          data={
            StudentSignatureSheet?.sort((a, b) =>
              a.studentWhoSign.lastName.localeCompare(
                b.studentWhoSign.lastName,
              ),
            ) ?? []
          }
        />
      </div>
    </>
  )
}

export default Page
