import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { ModuleByEmailStore } from "@/app/resources/models/modules.model";

export const getModuleByEmailStore = create<ModuleByEmailStore>((set) => ({
  moduleByEmail: undefined,
  fetchModuleByEmail: async (email) => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/module/user/${email}`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        }
      );
      const data = response.data;
      set({ moduleByEmail: data });
    } catch (error) {
      console.error("Erreur lors de la récupération des modules :", error);
    }
  },
}));
