"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app/components/app-sidebar";
import HeaderLayout from "@/app/components/HeaderLayout";
import { useSidebarState } from "@/app/store/SidebarState";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

export default function HeaderSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const { isOpen, setIsOpen } = useSidebarState();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const cookieToken = Cookies.get("token");
    setToken(cookieToken);
    setIsMounted(true);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {token === undefined ? (
        <>
          <HeaderLayout />
          {children}
        </>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main className="size-full">
            <SidebarTrigger
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="fixed"
            />
            {children}
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
