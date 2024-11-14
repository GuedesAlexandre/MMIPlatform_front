"use client";

import { useAuthStore } from "../store/AuthRepository";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome to the MMI Platform! {user?.user.name}</h2>
    </div>
  );
}
