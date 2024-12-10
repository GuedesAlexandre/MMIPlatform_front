import { ButtonsUIProps } from "@/app/models/ui/buttons.model";
import classNames from "classnames";

function ButtonsUI({ type, label, customClassName, disbled }: ButtonsUIProps) {
  const buttonClasses = classNames(
    customClassName,
    "w-60 sm:w-72 rounded-[5px] py-[10px] font-tahoma",
    {
      "bg-primary-blue text-background-color hover:bg-primary-blue-hover transition-colors duration-200":
        type === "submit",
    }
  );
  return (
    <button type={type} className={buttonClasses} disabled={disbled}>
      {label}
    </button>
  );
}

export default ButtonsUI;
