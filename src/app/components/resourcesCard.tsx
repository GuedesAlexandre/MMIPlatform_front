import { useRouter } from "next/navigation";
import { toSlug } from "@/app/utils/textToSlug";
import { PersonIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { useEffect } from "react";
import { Module } from "@/app/resources/models/modules.model";

const ResourceCard = ({ module }: { module: Module }) => {
  const router = useRouter();
  const slugName = toSlug(module.name);
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  useEffect(() => {
    setStudentByPromo(module.promo);
  }, []);
  const handleClickNavigation = () => {
    router.push(
      `/resources/${slugName}?data=${encodeURIComponent(
        JSON.stringify(module)
      )}`
    );
  };

  return (
    <div className="mt-5 w-full mx-auto border border-placeholder-color rounded-md">
      <div
        className={
          module.promo === "MMI01"
            ? "bg-[#00936E] text-background-color flex flex-row justify-between pt-44 px-5"
            : module.promo === "MMI02"
            ? "bg-[#E83583] text-background-color flex flex-row justify-between pt-44 px-5"
            : "bg-[#8B4A97] text-background-color flex flex-row justify-between pt-44 px-5"
        }
      >
        <p className="pb-3">{module.promo}</p>
        <div className="flex flex-row items-center pb-3">
          <PersonIcon />
          <p>{studentsByPromo?.length}</p>
        </div>
      </div>
      <div className="px-4 flex flex-row justify-between items-center py-5">
        <p className="w-3/4">{module?.name}</p>
        <div className="flex justify-end h-fit">
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
