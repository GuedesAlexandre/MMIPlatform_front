"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app/components/app-sidebar";
import HeaderLayout from "@/app/components/HeaderLayout";

export default function HeaderSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // const tokenFromCookie = getCookie("token"); 
    // setToken(tokenFromCookie);
    setToken(sessionStorage.getItem("token"))
  }, []);

  return (
    <>
      {token === null ? (
        <>
          <HeaderLayout />
          {children}
        </>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
