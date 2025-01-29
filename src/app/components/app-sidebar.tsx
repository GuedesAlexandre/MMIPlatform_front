import { defineMenuSidebar } from "@/app/utils/sidebarMenu";
import { MMI_Image } from "@/public/assets/svg";
import { MMI_Image_mini } from "@/public/assets/svg";
import AvatarInitialIcon from "@/app/components/ui/AvatarInitialIcon";
import { useSidebarState } from "@/app/store/SidebarState.store";
import { usePathname } from "next/navigation";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import TextAvatarIcon from "@/app/components/ui/TextAvatarIcon";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import LogOut from "@/app/components/ui/LogOut";
import { ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
  const { isOpen } = useSidebarState();
  const { user } = useAuthStore();
  const sidebarMenu = defineMenuSidebar(user);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {isMobile ? (
          <Link href="/dashboard" className="mt-2">
            <MMI_Image className="w-2/3 mx-auto" />
          </Link>
        ) : isOpen ? (
          <Link href="/dashboard" className="mt-2">
            <MMI_Image_mini className="w-2/3 mx-auto" />
          </Link>
        ) : (
          <Link href="/dashboard" className="mt-2">
            <MMI_Image className="w-2/3 mx-auto" />
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title} className="mt-2">
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
                      <AvatarInitialIcon
                        firstName={user.user.firstName}
                        lastName={user.user.name}
                      />
                      <TextAvatarIcon
                        firstName={user.user.firstName}
                        lastName={user.user.name}
                      />
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <LogOut cookieKey="token" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/legalNotice">
                <span className="text-background-color">Mentions Légales</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
