import { sidebarMenu } from "../utils/sidebarMenu";
import { MMI_Image } from "@/public/assets/svg";
import AvatarInitialIcon from "./ui/AvatarInitialIcon";
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="mt-2">
          <MMI_Image className="w-2/3 mx-auto" />
        </Link>
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
      <SidebarFooter className="text-center text-sm flex flex-row items-center justify-around mb-5">
        <AvatarInitialIcon firstName={"cheriffa"}/>
        <TextAvatarIcon firstName={"cheriffa"} lastName={"boucetta"}/>
      </SidebarFooter>
    </Sidebar>
  );
}
