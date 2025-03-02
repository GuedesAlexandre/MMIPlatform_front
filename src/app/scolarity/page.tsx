'use client'

import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import withAuth from '@/app/HOC'
import {
  BackpackIcon,
  CrumpledPaperIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Accordion from '@/app/components/accordion'
import { DataTable } from '@/app/scolarity/components/SheetCurrentDay'
import { columns } from '@/app/scolarity/components/columnDef'
import { useEffect } from 'react'
import { storeSheet } from '@/app/store/Sheets.store'

function Page() {
  const router = useRouter()
  const { setSignatureSheet, signatureSheet } = storeSheet()
  const today = new Date()
  const todayStart = new Date(today.setHours(0, 0, 0, 0))
  const todayEnd = new Date(today.setHours(23, 59, 59, 999))
  useEffect(() => {
    setSignatureSheet()
  }, [])

  return (
    <>
      <TitleHeaderUI
        label={'Gestion de la scolarité et des absences'}
      ></TitleHeaderUI>
      <div className='px-10'>
        <Accordion
          open={false}
          data={
            <DataTable
              columns={columns}
              data={
                signatureSheet
                  ?.filter((sign) => {
                    const finishDate = new Date(sign.finishAt)
                    return finishDate >= todayStart && finishDate <= todayEnd
                  })
                  .sort(
                    (a, b) =>
                      new Date(b.finishAt).getTime() -
                      new Date(a.finishAt).getTime(),
                  ) ?? []
              }
            />
          }
          name={'Les derniers émergements'}
          icon={<FileTextIcon />}
        />
        <div
          onClick={() => {
            router.push(`/scolarity/all-missing-list`)
          }}
          className='flex flex-row justify-between border border-placeholder-color rounded-md px-4 py-5 cursor-pointer mt-4'
        >
          <div className='flex flex-row items-center'>
            <BackpackIcon className='mr-1' />
            <p>Voir toutes les feuilles d’émargement.</p>
          </div>
          <ChevronRight className='cursor-pointer' />
        </div>

        <div
          onClick={() => {
            router.push(`/scolarity/makeup`)
          }}
          className='flex flex-row justify-between border border-placeholder-color rounded-md px-4 py-5 cursor-pointer mt-4'
        >
          <div className='flex flex-row items-center'>
            <CrumpledPaperIcon className='mr-1' />
            <p>Valider les rattrapages</p>
          </div>
          <ChevronRight className='cursor-pointer' />
        </div>
      </div>
    </>
  )
}

export default withAuth(Page)
