"use client";

import ResourceCard from "@/app/components/resourcesCard"
import TitleUI from "@/app/components/ui/TitleUi";
import { useAuthStore } from "@/app/store/AuthRepository"

const Resources = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <TitleUI label="Mes Ressources" />
      <div className="w-[90%] mx-auto">
        {user &&
          user.user.moduleDaos.map((module) => {
            return <ResourceCard key={module.id} module={module} />;
          })}
      </div>
    </div>
  );
};
export default Resources;
