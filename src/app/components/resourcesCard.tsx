import { UserModules } from "@/app/auth/models/User";
import { useRouter } from "next/navigation";
import { toSlug } from "@/app/utils/textToSlug"

const ResourceCard = ({
  module,
  key,
}: {
  module: UserModules;
  key: string;
}) => {

  const router = useRouter();
  const slugName = toSlug(module.name)
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
      className="mt-5 border-2 border-green-600 bg-yellow-300 text-red-500"
    >
      <h1>{module?.name}</h1>
      <p className="cursor-pointer" onClick={handleClickNavigation}>
        Modifier
      </p>
    </div>
  );
};
export default ResourceCard;
