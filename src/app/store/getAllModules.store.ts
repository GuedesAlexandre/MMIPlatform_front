import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { storeModule } from "@/app/users/createUser/components/data-table/models/data-table.model";

export const getModuleStore = create<storeModule>((set) => ({
  all_module: undefined,
  fetchModule: async () => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/module/all`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        }
      );
      const data = response.data;
      set({ all_module: data });
    } catch (error) {
      console.error("Erreur lors de la récupération des modules :", error);
    }
  },
}));
