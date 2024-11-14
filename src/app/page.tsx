"use client";

import { useEffect } from "react";
import ConnectionForm from "./components/ConnectionForm";
import { useAuthStore } from "./store/AuthRepository";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const { user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (user !== undefined) {
      Cookies.set("token", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      Cookies.remove("token");
      router.push("/");
    }
  }, [user, router]);

  return <ConnectionForm />;
}
