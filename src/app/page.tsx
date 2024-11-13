"use client";

import { useEffect } from "react";
import ConnectionForm from "./components/ConnectionForm";
import { useAuthStore } from "./store/AuthRepository";

export default function Home() {
  const { user, fetchAuthToken } = useAuthStore();
  useEffect(() => {
    fetchAuthToken();
    if (user !== undefined) {
      sessionStorage.setItem("token", JSON.stringify(user));
    } else {
      sessionStorage.setItem("token", "temp");
    }
  }, []);

  return <ConnectionForm />;
}
