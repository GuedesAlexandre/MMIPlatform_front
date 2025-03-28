'use client'
import Accordion from '@/app/components/accordion'
import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import { useStudentsByPromo } from '@/app/store/useStudentsByPromo.store'
import { ArrowLeftIcon, PersonIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DataStudentTable from './components/DataStudentTable'

const ListStudent = () => {
  const searchParm = useSearchParams()
  const promo = searchParm.get('promo')
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo()
  const router = useRouter()
  useEffect(() => {
    if (!promo) return
    setStudentByPromo(promo)
  }, [promo, setStudentByPromo])

  return (
    <>
      <TitleHeaderUI label={`Gestion des stages ${promo}`}></TitleHeaderUI>
      <div
        onClick={() => router.back()}
        className='flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit pt-10'
      >
        <ArrowLeftIcon className='size-6 mr-1' />
        <p>Retour</p>
      </div>
      <div className='p-10 mx-auto'>
        <Accordion
          icon={<PersonIcon />}
          name={'Liste des étudiants'}
          open={true}
          data={
            studentsByPromo && (
              <DataStudentTable studentsByPromo={studentsByPromo} />
            )
          }
        />
      </div>
    </>
  )
}

export default ListStudent
