"use client";
import { PersonIcon } from "@radix-ui/react-icons";
interface studentCardProps {
  lastName: string;
  firstName: string;
  group?: string;
}
const StudentCard: React.FC<studentCardProps> = ({
  lastName,
  firstName,
  group,
}: studentCardProps) => {
  return (
    <div
      className="
        flex flex-col sm:flex-row mx-auto border items-center justify-between px-3
        border-placeholder-color rounded-md w-full sm:w-4/5 py-2 
        hover:bg-gray-200 active:bg-gray-300 hover:shadow-md transition duration-200 cursor-pointer
      "
    >
      {/* <PersonIcon className="ml-2 w-1/5" /> */}
      <div className="flex md:flex-col sm:flex-row">
        <div className="flex flex-row">
          <p className="p-1 text-sm sm:text-base">{lastName}</p>
          <p className="p-1 text-sm sm:text-base">{firstName}</p>
        </div>
        <p className="p-1 text-sm sm:text-base">{group}</p>
      </div>
    </div>
  );
};
export default StudentCard;
