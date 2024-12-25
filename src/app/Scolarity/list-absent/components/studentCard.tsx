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
      <div className="flex flex-row t-5 mx-auto border items-center justify-center gap-4  border-placeholder-color rounded-md w-4/5 py-2 mr-auto hover:bg-gray-200 active:bg-gray-300 hover:shadow-md transition duration-200 cursor-pointer">
        <PersonIcon className="h-full ml-2" />
        <p className="p-1">{lastName}</p>
        <p className="p-1">{firstName}</p>
        <p className="p-1">{group}</p>
      </div>
    </>
  );
};
export default StudentCard;
