'use client'

import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import withAuth from '@/app/HOC'
import { CrumpledPaperIcon } from '@radix-ui/react-icons'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()

  return (
    <>
      <TitleHeaderUI
        label={'Gestion de la scolarité et des absences'}
      ></TitleHeaderUI>
      <div className='px-10'>
        <div
          onClick={() => {
            router.push(`/scolarity/makeup`)
          }}
          className='flex flex-row justify-between border border-placeholder-color rounded-md px-4 py-5 cursor-pointer'
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
