import { InputUIProps } from "@/app/models/ui/input.model";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { ReactNode, useState } from "react";

export default function InputUI({
  type,
  name,
  label,
  placeholder,
  icon,
  register,
  rules,
  haveError,
  trigger,
  errors,
}: InputUIProps) {
  const [isClose, setIsClose] = useState(false);
  const [focus, setFocus] = useState(false);
  const hasError = !!errors?.[name];

  const togglePasswordVisibility = () => {
    setIsClose(!isClose);
  };

  const buttonClasses = classNames(
    "border rounded-[5px] p-1 pl-[12px] py-2 flex items-center gap-x-[14px] focus-within:border-text-color-black transition-colors duration-500 font-tahoma",
    {
      "border-secondary-text-color":
        !haveError && (!errors || !errors[name]?.message),
      "border-danger": haveError || (errors && errors[name]?.message && !focus),
    }
  );
  return (
    <span className="flex flex-col xs:w-72 w-full">
      <label className="mb-[5px] font-tahoma" htmlFor={name}>
        {label}
      </label>
      <span className={buttonClasses}>
        {icon && <div className="text-secondary-text-color">{icon}</div>}
        <input
          className="outline-none w-full text-xs xs:text-base !bg-white h-6"
          type={type === "password" && isClose ? "text" : type}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            if (trigger) trigger(name);
          }}
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

      {hasError && !focus && (
        <span className=" text-sm font-semibold text-danger mt-1">
          {errors?.[name]?.message as ReactNode}
        </span>
      )}
    </span>
  );
}
