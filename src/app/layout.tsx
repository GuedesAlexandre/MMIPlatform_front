import type { Metadata } from "next";
import "./globals.css";
import HeaderLayout from "@/app/components/HeaderLayout";

import { useAuthStore } from "./store/AuthRepository";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export const metadata: Metadata = {
  title: "MMIPlatform",
  description:
    "Projet universelle de gestion des matrices et la scolarité pour les étudiants en MMI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();

  return (
    <html lang="fr">
      <body>
        {user === undefined ? (
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
      </body>
    </html>
  );
}
