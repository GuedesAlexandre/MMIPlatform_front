import { create } from "zustand";
import { storeUser, User } from "../auth/models/User";

export const useAuthStore = create<storeUser>((set) => ({
  user: undefined,
  fetchAuthToken: (email?: string, password?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const jwt = require("jsonwebtoken");
    try {
      //todo active comment went back have authentification
      // if (!process.env.API_PATH) return;
      // const response = await axios.get(process.env.API_PATH, {
      //   params: { email, password },
      // });
      // const token = response.data;
      const dataUser = jwt.verify(
        process.env.NEXT_PUBLIC_TEMP, //todo delete this ligne and use toke in comment
        process.env.NEXT_PUBLIC_SECRET_KEY
      ) as User;

      set({ user: dataUser });
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
  },
}));
