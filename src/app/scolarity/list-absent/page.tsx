'use client'

import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import { useRouter, useSearchParams } from 'next/navigation'
import StudentCard from '@/app/scolarity/list-absent/components/studentCard'
import { useStudentsByPromo } from '@/app/store/useStudentsByPromo.store'
import { useEffect, useState } from 'react'
import { Student } from '@/app/resources/models/student.model'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Accordion from '@/app/components/accordion'
import { UserRoundX, UserRoundCheck } from 'lucide-react'
import withAuth from '@/app/HOC'

const Page = () => {
  const searchParm = useSearchParams()
  const promo = searchParm.get('promo')

  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo()
  const [absentStudents, setAbsentStudents] = useState<Student[] | undefined>(
    undefined,
  )
  const [studentsWithoutAbsent, setStudentsWithoutAbsent] = useState<
    Student[] | undefined
  >(undefined)
  const router = useRouter()
  const handleClickChooseStudent = (numEtu: string) => {
    router.push(`/scolarity/missing-list?numEtu=${numEtu}`)
  }
  useEffect(() => {
    if (!promo) return
    setStudentByPromo(promo)
  }, [promo, setStudentByPromo])

  useEffect(() => {
    setAbsentStudents(
      studentsByPromo?.filter((student) => {
        return student.notes.some(
          (note) => note.status === 'ABS' || note.status === 'MAKEUP',
        )
      }),
    )
    setStudentsWithoutAbsent(
      studentsByPromo?.filter(
        (student) =>
          !absentStudents?.some(
            (absStudent) => absStudent.numEtu === student.numEtu,
          ),
      ),
    )
  }, [studentsByPromo])
  return (
    <>
      <TitleHeaderUI
        label={`Gestion de la scolarité et des absences ${promo}`}
      ></TitleHeaderUI>
      <div
        onClick={() => router.back()}
        className='flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit'
      >
        <ArrowLeftIcon className='size-6 mr-1' />
        <p>Retour</p>
      </div>
      <div className='p-6'>
        {absentStudents && absentStudents.length > 0 ? (
          <Accordion
            name={
              'Liste des étudiants possédant des absences ou des rattrapages en cours'
            }
            open={true}
            data={
              <div className='lg:grid-cols-4 p-6 md:grid-cols-2 sm:grid-cols-1 grid gap-3'>
                {absentStudents.map((student) => (
                  <a
                    key={student.numEtu}
                    onClick={() => handleClickChooseStudent(student.numEtu)}
                  >
                    <StudentCard
                      lastName={student.lastName}
                      firstName={student.firstName}
                      group={student.group}
                    />
                  </a>
                ))}
              </div>
            }
            icon={<UserRoundX strokeWidth={1} absoluteStrokeWidth={true} />}
          />
        ) : (
          <div className='py-6'>
            <span>
              Aucun étudiant avec des absences dans des évaluations ou des
              rattrapages en cours.
            </span>
          </div>
        )}
        <Accordion
          name={'Liste des étudiants sans absences ni rattrapage en cours'}
          open={false}
          data={
            <div className='lg:grid-cols-4 p-6 md:grid-cols-2 sm:grid-cols-1 grid gap-3'>
              {studentsWithoutAbsent &&
                studentsWithoutAbsent.map((student) => (
                  <a key={student.numEtu}>
                    <StudentCard
                      lastName={student.lastName}
                      firstName={student.firstName}
                      group={student.group}
                    />
                  </a>
                ))}
            </div>
          }
          icon={<UserRoundCheck strokeWidth={1} absoluteStrokeWidth={true} />}
        />
      </div>
    </>
  )
}

export default withAuth(Page)
