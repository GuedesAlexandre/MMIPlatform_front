import { create } from 'zustand'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Student } from '@/app/matrix/models/students.model'

interface StudentsStore {
  studentsByPromoAndGroup: Student[] | undefined
  setStudentByPromoAndGroupe: (
    promo: string,
    group: string,
  ) => Promise<Student[]>
}

export const useStudentsByPromoAndGroup = create<StudentsStore>((set) => ({
  studentsByPromoAndGroup: undefined,
  setStudentByPromoAndGroupe: async (promo: string, group: string) => {
    const bearer = Cookies.get('bearer')
    try {
      if (group.startsWith('TP')) {
        const tp = group.slice(3, 4)

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_PATH}/student/search/group/${promo}/${tp}`,
          {
            headers: {
              Authorization: `Bearer ${bearer?.toString()}`,
            },
          },
        )
        const data = response.data
        set({ studentsByPromoAndGroup: data })
        return data
      } else {
        const groupStudent = group === 'CM' ? '' : `/${group}`

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_PATH}/student/${promo}${groupStudent}`,
          {
            headers: {
              Authorization: `Bearer ${bearer?.toString()}`,
            },
          },
        )
        const data = response.data
        set({ studentsByPromoAndGroup: data })
        return data
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error)
    }
  },
}))
