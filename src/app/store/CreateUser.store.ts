import { create } from "zustand";
import { CreateUserStore } from "@/app/users/createUser/components/data-table/models/data-table.model";
import { User } from "@/app/users/models/user.model";
import axios from "axios";
import Cookies from "js-cookie";

export const CreateUser = create<CreateUserStore>((set) => ({ 
  user: undefined,
  createUser: async (data: User) => {
    const bearer = Cookies.get("bearer");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth`,
        data,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        }
      );
      const createdUser = response.data as User;

      set({ user: createdUser });
      return createdUser;
    } catch (error) {
      console.error("Erreur lors de la création du user :", error);
      return undefined;
    }
  },
}));
