import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeUsers, UserSessionJWT } from "@/app/models/UserSessionJWT";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const useAuthStore = create(
  persist<storeUsers>(
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
          Cookies.set("bearer", token);
          const dataUser = jwt.decode(
            token,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ) as UserSessionJWT;

          set({ user: dataUser });
          return dataUser;
        } catch (err: unknown) {
          const error = err as AxiosError;
          console.error(
            "Erreur lors de la récupération du token d'authentification :",
            error
          );

          if (error.response) {
            if (error.response.status === 400) {
              return {
                error: "Votre mot de passe ou votre adresse mail est invalide.",
              };
            }
          }
          return { error: "Une erreur interne est survenue." };
        }
      },
      removeUserSession: () => {
        Cookies.remove("bearer");
        Cookies.remove("token");
        set({ user: undefined });
      },
      checkSessionExpiration: () => {
        set((state) => {
          if (state.user?.exp) {
            const isExpired = Date.now() > state.user.exp * 1000;
            if (isExpired) {
              Cookies.remove("bearer");
              Cookies.remove("token");
              return { user: undefined };
            }
          }

          return state;
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
