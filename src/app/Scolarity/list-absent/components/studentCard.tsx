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
    <>
      <div className="flex flex-col sm:flex-row t-5 mx-auto border items-center justify-center gap-4 border-placeholder-color rounded-md w-full sm:w-4/5 py-2 mr-auto hover:bg-gray-200 active:bg-gray-300 hover:shadow-md transition duration-200 cursor-pointer">
        <PersonIcon className="h-full ml-2" />
        <p className="p-1 text-sm sm:text-base">{lastName}</p>
        <p className="p-1 text-sm sm:text-base">{firstName}</p>
        <p className="p-1 text-sm sm:text-base">{group}</p>
      </div>
    </>
  );
};
export default StudentCard;