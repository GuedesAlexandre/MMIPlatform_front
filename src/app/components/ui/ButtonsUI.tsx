import { ButtonsUIProps } from "@/app/models/ui/buttons.model";
import classNames from "classnames";
import React from "react";

function ButtonsUI({ type, label, customClassName }: ButtonsUIProps) {
  const buttonClasses = classNames(
    customClassName,
    "w-60 sm:w-72 rounded-[5px] py-[10px] font-tahoma",
    {
      "bg-primary-blue text-background-color hover:bg-primary-blue-hover transition-colors duration-200":
        type === "submit",
    }
  );
  return (
    <button type={type} className={buttonClasses}>
      {label}
    </button>
  );
}

export default ButtonsUI;
