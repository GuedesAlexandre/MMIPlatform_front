import { Home, LayoutGrid, Frame, BadgeAlert, Box } from "lucide-react";
import { MMI_Image } from "@/public/assets/svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Modules",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Matrices",
    url: "/dashboard",
    icon: Frame,
  },
  {
    title: "Absences",
    url: "/dashboard",
    icon: BadgeAlert,
  },
  {
    title: "Salles",
    url: "/dashboard",
    icon: Box,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="mt-2">
          <MMI_Image className="w-2/3 mx-auto"/>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
