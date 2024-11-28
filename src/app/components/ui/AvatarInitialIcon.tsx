import { useSidebarState } from "@/app/store/SidebarState";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
export default function AvatarInitialIcon({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const { isOpen } = useSidebarState();
  const isMobile = useIsMobile();
  const initial: string =
    firstName?.slice(0, 1).toLocaleUpperCase() +
    lastName?.slice(0, 1).toLocaleUpperCase();
  return (
    <Avatar
      className={
        isOpen && !isMobile
          ? "size-full mx-auto rounded-lg"
          : "size-8 rounded-lg"
      }
    >
      <AvatarImage
        src={`https://api.dicebear.com/9.x/initials/svg?radius=50&backgroundColor=FBBA00&size=96&seed=${initial}`}
        alt="Avatar"
      />
      <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
    </Avatar>
  );
}
