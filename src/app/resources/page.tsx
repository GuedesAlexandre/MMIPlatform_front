"use client";

import ResourceCard from "@/app/components/resourcesCard";
import { useAuthStore } from "@/app/store/AuthRepository";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";

const Resources = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <TitleHeaderUI label="Mes Ressources" />
      <div className="p-10 grid grid-cols-3 mx-auto gap-10 flex-wrap">
        {user &&
          user.user.moduleDaos.map((module) => {
            return <ResourceCard key={module.id} module={module} />;
          })}
      </div>
    </div>
  );
};
export default Resources;
