import { InputUIProps } from "@/app/models/ui/input.model";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function InputUI({
  type,
  name,
  label,
  placeholder,
  icon,
}: InputUIProps) {
  const [isClose, setIsClose] = useState(false);

  const togglePasswordVisibility = () => {
    setIsClose(!isClose);
  };
  return (
    <span className="flex flex-col w-72">
      <label htmlFor={name}>{label}</label>
      <span className="border border-gray rounded-[10px] p-1 pl-[12px] py-2 flex items-center gap-x-[14px]">
        {icon && <div className="text-gray">{icon}</div>}
        <input
          className=" outline-none w-full"
          type={type === "password" && isClose ? "text" : type}
          id={name}
          name={name}
          placeholder={placeholder}
        />
        {type === "password" &&
          (isClose ? (
            <EyeOpenIcon
              onClick={togglePasswordVisibility}
              className="text-black mr-[14px] cursor-pointer"
            />
          ) : (
            <EyeClosedIcon
              onClick={togglePasswordVisibility}
              className="text-black mr-[14px] cursor-pointer"
            />
          ))}
      </span>
    </span>
  );
}
