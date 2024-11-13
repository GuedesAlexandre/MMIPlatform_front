import { Avatar } from "@/app/models/ui/avatar.model";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

export default function AvatarInitialIcon({ firstName }: Avatar) {
  const svgAvatarInitial = createAvatar(initials, {
    seed: firstName,
    textColor: ["FAFAFA"],
    backgroundColor: ['fbba00'],
    radius: 50,
    randomizeIds: false,
    size: 64
  });

  return <div dangerouslySetInnerHTML={{ __html: svgAvatarInitial }} className="w-1/3 flex justify-center ml-3"/>;
}
