"use client";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { studentsControlTable } from "@/app/resources/helper/studentsControlsTable";

const TooltipResource = ({
  promo,
  resourceName,
}: {
  promo: string;
  resourceName: string;
}) => {
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();

  useEffect(() => {
    setStudentByPromo(promo);
  }, []);
  const controls = studentsControlTable(studentsByPromo, resourceName);
  console.log(controls);
  return (
    <div className="flex flex-row items-center">
      {controls.length >= 2 ? (
        <p className="text-success mr-3">Ressource valide</p>
      ) : (
        <p className="text-danger mr-3">Ressource non-valide</p>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <QuestionMarkCircledIcon className="size-5 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent side="right">
            {controls.length >= 2 ? (
              <p>
                Vous avez assez de contrôle pour que votre ressource soit
                valide.
              </p>
            ) : controls.length == 1 ? (
              <p>
                Il vous manque un contrôle pour que votre ressource soit valide.
              </p>
            ) : (
              <p>
                Vous devez avoir au minimum 2 contrôles pour que votre ressource
                soit valide.
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TooltipResource;
