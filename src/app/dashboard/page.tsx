"use client";

import AppBento from "../components/app-bento";
import { useAuthStore } from "../store/AuthRepository";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="pl-10 pt-10 pr-10">
      <h1>Dashboard</h1>
      <h2>Welcome to the MMI Platform! {user?.user.name}</h2>
      <div className="pt-10">
      <AppBento />
      </div>
    </div>
  );
}
