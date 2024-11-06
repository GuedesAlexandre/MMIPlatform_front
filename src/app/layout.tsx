import type { Metadata } from "next";
import "./globals.css";
import HeaderLayout from "@/app/components/HeaderLayout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
