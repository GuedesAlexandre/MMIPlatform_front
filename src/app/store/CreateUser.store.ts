import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { CreateUserStore } from "../users/createUser/components/data-table/models/data-table.model";

export const CreateUser = create<CreateUserStore>((set) => ({
  user: undefined,
  createUser: async (data) => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
          params: {
            ...data,
          },
        }
      );

      set({ user: data });
    } catch (error) {
      console.error("Erreur lors de la création du user :", error);
    }
  },
}));
