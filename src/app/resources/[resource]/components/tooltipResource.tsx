import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const TooltipResource = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <QuestionMarkCircledIcon className="ml-5 size-5"/>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Vous devez avoir au minimum 2 contrôles pour que votre ressource soit valide.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipResource;
