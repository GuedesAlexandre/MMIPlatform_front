import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeUser, User } from "../auth/models/User";
import axios from "axios";
import { set } from "react-hook-form";

export const useAuthStore = create(
  persist<storeUser>(
    (set) => ({
      user: undefined,
      fetchAuthToken: async (email, password) => {
        const jwt = require("jsonwebtoken");
        try {
          if (!process.env.NEXT_PUBLIC_API_PATH) return;
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_PATH}/auth/users/me`,
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
              },
            }
          );

          const token = response.data;
          axios.defaults.headers.common["Authorization"] = token;
          const dataUser = jwt.verify(
            token,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ) as User;

          set({ user: dataUser });
        } catch (error) {
          console.error(
            "Erreur lors de la récupération du token d'authentification :",
            error
          );
        }
      },
      removeUserSession: () => set({ user: undefined }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);