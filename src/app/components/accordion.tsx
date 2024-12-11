import { ChevronDown, ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

interface Accordion {
  icon: ReactNode;
  name: string;
  data: ReactNode;
  open: boolean;
}

const Accordion = ({ icon, name, data, open }: Accordion) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  return (
    <div className="border-placeholder-color border rounded-md mb-5">
      <div
        className="flex flex-row justify-between px-4 py-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row items-center">
          {icon}
          <p className="w-fit select-none ml-2">{name}</p>
        </div>
        {isOpen ? (
          <ChevronDown onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <ChevronRight onClick={() => setIsOpen(!isOpen)} />
        )}
      </div>
      {isOpen && <div className="p-4">{data}</div>}
    </div>
  );
};

export default Accordion;
