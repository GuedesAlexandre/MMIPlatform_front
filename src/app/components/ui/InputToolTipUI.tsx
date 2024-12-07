import { InputUIProps } from "@/app/models/ui/input.model";
import { InputTooltipUIProps } from "@/app/models/ui/input.tooltip.model";
import classNames from "classnames";
import React from "react";
import TooltipUI from "./TooltipUI";

function InputToolTipUI({
  type,
  name,
  label,
  icon,
  register,
  message,
  placeholder,
  rules,
  haveError,
}: InputTooltipUIProps) {
  const buttonClasses = classNames(
    "border rounded-[5px] p-1 pl-[12px] py-2 flex items-center gap-x-[14px] focus-within:border-text-color-black transition-colors duration-500 font-tahoma",
    {
      "border-secondary-text-color": !haveError,
      "border-danger": haveError,
    }
  );
  return (
    <span className="flex flex-col xs:w-72 w-full">
      <span className="flex content-center">
        <label className="mb-[5px] font-tahoma pr-1" htmlFor={name}>
          {label}
        </label>
        {icon && <TooltipUI icon={icon} message={message} />}
      </span>

      <span className={buttonClasses}>
        <input
          className="outline-none w-full text-xs xs:text-base !bg-white h-6"
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
        />
      </span>
    </span>
  );
}

export default InputToolTipUI;
