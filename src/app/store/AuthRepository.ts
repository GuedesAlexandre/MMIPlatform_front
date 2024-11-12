import { create } from "zustand";
import { storeUser, User } from "../auth/models/User";
import axios from "axios";
import { headers } from "next/headers";

export const useAuthStore = create<storeUser>((set) => ({
  user: undefined,
  fetchAuthToken: async () => {
    const email = "test@example.com";
    const password = "Password@123";
    const jwt = require("jsonwebtoken");
    try {
      if (!process.env.NEXT_PUBLIC_API_PATH) return;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth/users/me`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          }
        }
      );
      const token = response.data;
      console.log("🚀 ~ fetchAuthToken: ~ token:", token);
      
      const dataUser = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_SECRET_KEY
      ) as User;
      set({ user: dataUser });
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
  },
}));
