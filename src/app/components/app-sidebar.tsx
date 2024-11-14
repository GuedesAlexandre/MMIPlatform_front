import { sidebarMenu } from "../utils/sidebarMenu";
import { MMI_Image } from "@/public/assets/svg";
import { MMI_Image_mini } from "@/public/assets/svg";
import AvatarInitialIcon from "./ui/AvatarInitialIcon";
import { useSidebarState } from "../store/SidebarState";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import Link from "next/link";
import TextAvatarIcon from "./ui/TextAvatarIcon";
import { useAuthStore } from "../store/AuthRepository";

export function AppSidebar() {
  const { isOpen } = useSidebarState();
  const { user } = useAuthStore();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {!isOpen ? (
          <Link href="/dashboard" className="mt-2">
            <MMI_Image className="w-2/3 mx-auto" />
          </Link>
        ) : (
          <Link href="/dashboard" className="mt-2">
            <MMI_Image_mini className="w-2/3 mx-auto" />
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => (
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
      <SidebarFooter className="flex flex-row mb-3 items-center">
        {user && (
          <>
            {!isOpen ? (
              <>
                <AvatarInitialIcon firstName={user.user.firstName} />
                <TextAvatarIcon
                  firstName={user.user.firstName}
                  lastName={user.user.name}
                />
              </>
            ) : (
              <AvatarInitialIcon firstName={user.user.firstName} />
            )}
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
