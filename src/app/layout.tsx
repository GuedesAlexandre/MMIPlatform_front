import type { Metadata } from "next";
import "./globals.css";
import HeaderSidebar from "../lib/HeaderSidebar";

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
  return (
    <html lang="fr">
      <body>
        <HeaderSidebar>{children}</HeaderSidebar>
      </body>
    </html>
  );
}