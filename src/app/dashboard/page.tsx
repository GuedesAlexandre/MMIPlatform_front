"use client";

import AppBento from "../components/app-bento";
import HeaderUserDashboard from "../components/ui/HeaderUserDashboard";
import { useAuthStore } from "../store/AuthRepository";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="p-10">
      <div className="pb-10">
        <HeaderUserDashboard
          firstName={user?.user.firstName}
          lastName={user?.user.name}
        />
      </div>
      <div className="pt-10">
        <AppBento />
      </div>
    </div>
  );
}
