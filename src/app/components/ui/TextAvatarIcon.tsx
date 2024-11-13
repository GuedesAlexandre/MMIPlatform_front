import { Avatar } from "@/app/models/ui/avatar.model";

export default function TextAvatarIcon({ firstName, lastName }: Avatar) {
  return (
    <div className="w-2/3 flex flex-col items-start pl-2 text-base">
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
}
