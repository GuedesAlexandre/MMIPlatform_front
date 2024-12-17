import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { storeStudent } from "@/app/matrix/models/students.model";

export const studentsStore = create<storeStudent>((set) => ({
  students: undefined,
  setStudentsData: async () => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/student`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        }
      );
      const data = response.data;
      set({ students: data });
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des modules :", error);
    }
  },
}));
