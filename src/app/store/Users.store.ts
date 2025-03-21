import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { storeUsers } from "@/app/users/models/user.model";

export const UserStore = create<storeUsers>((set) => ({
  all_user: undefined,
  fetchUsers: async () => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth/user/all`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        }
      );
      const data = response.data;
      set({ all_user: data });
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  },
}));
