import axios from "axios";
import { create } from "zustand";
import { storeUser } from "../users/models/user.model";
import Cookies from "js-cookie";

export const UserStore = create<storeUser>((set) => ({
  all_user: undefined,
  fetchUsers: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth/user/all`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            Authorization: `Bearer ${Cookies.get("bearer")}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      set({ all_user: data });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  },
}));
