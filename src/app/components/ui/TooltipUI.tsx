import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";

function TooltipUI({
  icon,
  message,
}: {
  icon: React.ReactNode;
  message: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{icon}</TooltipTrigger>
        <TooltipContent side="right">{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipUI;
