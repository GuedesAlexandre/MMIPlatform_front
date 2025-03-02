'use client'
import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import { useSearchParams } from 'next/navigation'
import { storeSheet } from '@/app/store/Sheets.store'
import { useEffect } from 'react'
import Accordion from '@/app/components/accordion'
import DataTable from '@/app/scolarity/components/SheetCurrentDay'
import { columns } from '@/app/scolarity/components/columnDef'
import { FileTextIcon } from '@radix-ui/react-icons'

function Page() {
  const searchParams = useSearchParams()
  const moduleName = searchParams.get('moduleName')
  const { setSignatureSheetModule, studentSignatureSheetByModule } =
    storeSheet()

  useEffect(() => {
    if (!moduleName) return
    setSignatureSheetModule(moduleName)
  }, [moduleName])

  return (
    <>
      <TitleHeaderUI label={`Détail de la feuille de présence ${moduleName}`} />
      <div className='px-10'>
        <Accordion
          open={true}
          data={
            <DataTable
              columns={columns}
              data={
                studentSignatureSheetByModule?.sort((a, b) => {
                  const dateA = new Date(a.createdAt).getTime()
                  const dateB = new Date(b.createdAt).getTime()
                  const finishA = a.finishAt
                    ? new Date(a.finishAt).getTime()
                    : 0
                  const finishB = b.finishAt
                    ? new Date(b.finishAt).getTime()
                    : 0
                  if (dateB - dateA !== 0) {
                    return dateB - dateA
                  }
                  return finishB - finishA
                }) ?? []
              }
            />
          }
          name={'Listes'}
          icon={<FileTextIcon />}
        />
      </div>
    </>
  )
}

export default Page
