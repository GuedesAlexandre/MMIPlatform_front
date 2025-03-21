'use client'

import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import { useEffect, useState } from 'react'
import { useStudentsByPromo } from '@/app/store/useStudentsByPromo.store'
import PromoCard from '@/app/scolarity/components/PromoCard'
import withAuth from '@/app/HOC'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Page() {
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo()
  const [CountMMI01, setCountMMI01] = useState<number | undefined>(undefined)
  const [CountMMI02, setCountMMI02] = useState<number | undefined>(undefined)
  const [CountMMI03, setCountMMI03] = useState<number | undefined>(undefined)

  const router = useRouter()

  useEffect(() => {
    setStudentByPromo('MMI01')
    setCountMMI01(studentsByPromo?.length)
    setStudentByPromo('MMI02')
    setCountMMI02(studentsByPromo?.length)
    setStudentByPromo('MMI03')
    setCountMMI03(studentsByPromo?.length)
  }, [setStudentByPromo])
  return (
    <>
      <TitleHeaderUI label={'Gestion des rattrapages'}></TitleHeaderUI>
      <div
        onClick={() => router.back()}
        className='flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit'
      >
        <ArrowLeftIcon className='size-6 mr-1' />
        <p>Retour</p>
      </div>
      <div className='px-10'>
        <div className='flex justify-center items-center'>
          <h3>Séléctionnez une promotion</h3>
        </div>
        <div className='flex justify-center gap-8'>
          <PromoCard title='MMI01' number={CountMMI01} color='red'></PromoCard>
          <PromoCard title='MMI02' number={CountMMI02} color='red'></PromoCard>
          <PromoCard title='MMI03' number={CountMMI03} color='red'></PromoCard>
        </div>
      </div>
    </>
  )
}

export default withAuth(Page)
