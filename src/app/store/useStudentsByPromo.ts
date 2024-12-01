import { create } from "zustand";
import { StudentsStore } from "@/app/auth/models/Student";
import Cookies from "js-cookie";
import axios from "axios";

export const useStudentsByPromo = create<StudentsStore>((set) => ({
  studentsByPromo: undefined,
  setStudentByPromo: async (promo: string) => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/student/${promo}`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        }
      );
      const data = response.data;
      set({ studentsByPromo: data });
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
  },
}));
