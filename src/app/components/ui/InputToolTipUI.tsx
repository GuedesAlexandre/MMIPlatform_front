import { InputTooltipUIProps } from "@/app/models/ui/input.tooltip.model";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import TooltipUI from "@/app/components/ui/TooltipUI";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { EyeClosedIcon } from "@radix-ui/react-icons";

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
  errors,
  trigger,
}: InputTooltipUIProps) {
  const hasError = !!errors?.[name];
  const [isClose, setIsClose] = useState(false);
  const [focus, setFocus] = useState(false);

  const togglePasswordVisibility = () => {
    setIsClose(!isClose);
  };
  const buttonClasses = classNames(
    "border rounded-[5px] p-1 pl-[12px] py-2 flex items-center gap-x-[14px] focus-within:border-text-color-black transition-colors duration-500 font-tahoma",
    {
      "border-secondary-text-color": !haveError && !errors[name]?.message,
      "border-danger": haveError || (errors[name]?.message && !focus),
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
          type={isClose ? type : "text"}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            trigger(name);
            setFocus(false);
          }}
        />
        {isClose ? (
          <EyeOpenIcon
            onClick={togglePasswordVisibility}
            className="text-black mr-[14px] cursor-pointer"
          />
        ) : (
          <EyeClosedIcon
            onClick={togglePasswordVisibility}
            className="text-black mr-[14px] cursor-pointer"
          />
        )}
      </span>
      {hasError && !focus && (
        <span className=" text-sm font-semibold text-danger mt-1">
          {errors?.[name]?.message as ReactNode}
        </span>
      )}
    </span>
  );
}

export default InputToolTipUI;
