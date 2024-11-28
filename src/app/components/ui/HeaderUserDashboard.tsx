import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface HeaderUserDashboardProps {
  lastName: string | undefined;
  firstName: string | undefined;
}

const HeaderUserDashboard: React.FC<HeaderUserDashboardProps> = ({
  lastName,
  firstName,
}) => {
  const initial: string =
    firstName?.slice(0, 1).toLocaleUpperCase() +
    lastName?.slice(0, 1).toLocaleUpperCase();
  return (
    <>
      <div className="flex w-full p-8 rounded-sm justify-between items-center bg-primary-blue">
        <div className="flex flex-col gap-3 text-white">
          <h3 className="text-xl font-bold">Bienvenue sur votre tableau de bord, {firstName} !</h3>
          <p className="w-1/2 text-pretty">
            Gérer ici tous les éléments liés à la scolarité de votre promotion
            de BUT MMI. Vous pourrez ici gérer de la gestion de votre matrice
            jusqu’à la visualisation en 3D de votre établisssement.
          </p>
        </div>
        <div className="rounded-full">
          <Avatar className="size-full rounded-lg">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?radius=50&backgroundColor=FBBA00&size=96&seed=${initial}`}
              alt="Avatar"
            />
            <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default HeaderUserDashboard;
