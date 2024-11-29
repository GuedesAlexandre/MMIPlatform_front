import { UserModules } from "@/app/auth/models/User";

const ResourceCard = ({
  module,
  key,
}: {
  module: UserModules;
  key: string;
}) => {
  return (
    <div key={key} className="mt-5 border-2 border-green-600 bg-yellow-300 text-red-500">
      <h1>{module?.name}</h1>
      <p>Modifier</p>
    </div>
  );
};
export default ResourceCard;
