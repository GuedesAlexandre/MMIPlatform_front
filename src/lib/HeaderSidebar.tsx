"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app/components/app-sidebar";
import HeaderLayout from "@/app/components/HeaderLayout";
import { useSidebarState } from "@/app/store/SidebarState";

export default function HeaderSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const { isOpen, setIsOpen } = useSidebarState();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
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
            <SidebarTrigger
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            {children}
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
