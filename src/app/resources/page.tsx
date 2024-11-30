"use client";

import ResourceCard from "@/app/components/resourcesCard"
import { useAuthStore } from "@/app/store/AuthRepository"
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI"

const Resources = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <TitleHeaderUI label="Mes Ressources" />
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
