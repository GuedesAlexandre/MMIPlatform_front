import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import AvatarInitialIcon from "./AvatarInitialIcon";

interface HeaderUserDashboardProps {
  name?: string;
}

const HeaderUserDashboard: React.FC<HeaderUserDashboardProps> = ({ name }) => {
  return (
    <>
      <div className="flex w-full p-8 rounded-sm justify-between item-center bg-primary-blue">
        <div className="flex flex-col gap-3 text-white">
          <h3>Bienvenue sur votre tableau de bord, {name} !</h3>
          <p className="w-[50%] text-pretty">
            Gérer ici tous les éléments liés à la scolarité de votre promotion
            de BUT MMI. Vous pourrez ici gérer de la gestion de votre matrice
            jusqu’à la visualisation en 3D de votre établisssement.
          </p>
        </div>
        <div className="roundedFull">
          <Avatar className="size-full rounded-lg">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?radius=50&backgroundColor=FBBA00&size=96&seed=${name}`}
              alt="Avatar"
            />
            <AvatarFallback className="rounded-lg">
              {name?.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default HeaderUserDashboard;
