import { useSidebarState } from "@/app/store/SidebarState";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
export default function AvatarInitialIcon({
  firstName,
}: {
  firstName?: string;
}) {
  const { isOpen } = useSidebarState();
  const isMobile = useIsMobile();
  return (
    <Avatar
      className={isOpen && !isMobile ? "size-full mx-auto rounded-lg" : "size-8 rounded-lg"}
    >
      <AvatarImage
        src={`https://api.dicebear.com/9.x/initials/svg?radius=50&backgroundColor=FBBA00&size=96&seed=${firstName}`}
        alt="Avatar"
      />
      <AvatarFallback className="rounded-lg">
        {firstName?.slice(0, 2).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
