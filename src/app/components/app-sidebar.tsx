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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import TextAvatarIcon from "./ui/TextAvatarIcon";
import { useAuthStore } from "../store/AuthRepository";
import LogOut from "./ui/LogOut";
import { ChevronUp } from "lucide-react";

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
      <SidebarFooter className="mb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="!py-6">
                  {user && (
                    <>
                      {!isOpen ? (
                        <>
                          <AvatarInitialIcon firstName={user.user.firstName} />
                          <TextAvatarIcon
                            firstName={user.user.firstName}
                            lastName={user.user.name}
                          />
                          <ChevronUp className="ml-auto" />
                        </>
                      ) : (
                        <AvatarInitialIcon firstName={user.user.firstName} />
                      )}
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <LogOut  cookieKey="token" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
