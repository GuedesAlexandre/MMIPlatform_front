import type { Metadata } from "next";
import "./globals.css";
import HeaderLayout from "@/app/components/HeaderLayout";

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
        <HeaderLayout />
        {children}
      </body>
    </html>
  );
}
