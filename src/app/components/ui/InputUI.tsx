import { InputUIProps } from "@/app/models/ui/input.model";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function InputUI({
  type,
  name,
  label,
  placeholder,
  icon,
  register,
  rules,
}: InputUIProps) {
  const [isClose, setIsClose] = useState(false);

  const togglePasswordVisibility = () => {
    setIsClose(!isClose);
  };
  return (
    <span className="flex flex-col w-72">
      <label className="mb-[5px] font-tahoma" htmlFor={name}>
        {label}
      </label>
      <span
        className="border border-gray rounded-[10px] 
      p-1 pl-[12px] py-2 flex items-center gap-x-[14px] 
      focus-within:border-text-color-black transition-colors duration-500 font-tahoma"
      >
        {icon && <div className="text-gray">{icon}</div>}
        <input
          className=" outline-none w-full"
          type={type === "password" && isClose ? "text" : type}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
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
