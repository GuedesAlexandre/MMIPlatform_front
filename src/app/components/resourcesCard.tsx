import { UserModules } from "@/app/auth/models/User";
import { useRouter } from "next/navigation";
import { toSlug } from "@/app/utils/textToSlug";
import { PersonIcon, Pencil1Icon } from "@radix-ui/react-icons";

const ResourceCard = ({
  module,
  key,
}: {
  module: UserModules;
  key: string;
}) => {
  const router = useRouter();
  const slugName = toSlug(module.name);
  const handleClickNavigation = () => {
    router.push(
      `/resources/${slugName}?data=${encodeURIComponent(
        JSON.stringify(module)
      )}`
    );
  };
  return (
    <div
      key={key}
      className="mt-5 w-[90%] border border-placeholder-color rounded-md"
    >
      <div
        className={
          module.promo === "MMI01"
            ? "bg-[#00936E] text-background-color flex flex-row justify-between items-end pt-44 px-4 pb-2"
            : module.promo === "MMI02"
            ? "bg-[#E83583] text-background-color flex flex-row justify-between items-end pt-44 px-4 pb-2"
            : "bg-[#8B4A97] text-background-color flex flex-row justify-between items-end pt-44 px-4 pb-2"
        }
      >
        <p>{module.promo}</p>
        <div className="flex flex-row items-center">
          <PersonIcon />
          <p>42</p>
        </div>
      </div>
      <div className="px-4">
        <p className="py-2">{module?.name}</p>
        <div className="flex justify-end p-4 ">
          <p
            className="cursor-pointer border border-primary-blue p-1 rounded-sm"
            onClick={handleClickNavigation}
          >
            <Pencil1Icon className="text-primary-blue size-5" />
          </p>
        </div>
      </div>
    </div>
  );
};
export default ResourceCard;
