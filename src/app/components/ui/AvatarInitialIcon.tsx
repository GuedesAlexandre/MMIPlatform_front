import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarInitialIcon({
  firstName,
}: {
  firstName: string;
}) {
  // return <div dangerouslySetInnerHTML={{ __html: svgAvatarInitial }} className="w-1/3 flex justify-center ml-3"/>;
  return (
    <Avatar className="size-8 rounded-lg">
      <AvatarImage
        src={`https://api.dicebear.com/9.x/initials/svg?radius=50&backgroundColor=FBBA00&size=96&seed=${firstName}`}
        alt="Avatar"
      />
      <AvatarFallback className="rounded-lg">{firstName.slice(0,2).toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
