"use client";

import AppBento from "@/app/dashboard/components/app-bento";
import HeaderUserDashboard from "@/app/dashboard/components/HeaderUserDashboard";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import withAuth from "@/app/HOC";

function Dashboard() {
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

export default withAuth(Dashboard);
