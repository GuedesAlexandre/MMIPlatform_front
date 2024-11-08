import { ButtonsUIProps } from "@/app/models/ui/buttons.model";
import classNames from "classnames";
import React from "react";

function ButtonsUI({ type, label }: ButtonsUIProps) {
  const buttonClasses = classNames(
    "w-72 rounded-[10px] py-[10px] font-tahoma",
    {
      "bg-principale-blue text-background-color hover:bg-principal-blue-hover transition-colors duration-200":
        type === "submit",
      "bg-gray-500 text-gray-200": type === "button",
    }
  );
  return (
    <button type={type} className={buttonClasses}>
      {label}
    </button>
  );
}

export default ButtonsUI;
