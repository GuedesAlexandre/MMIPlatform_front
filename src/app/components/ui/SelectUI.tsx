import { SelectUIProps } from "@/app/models/ui/select.model";
import { cn } from "@/lib/utils";
import classNames from "classnames";

export default function SelectUI({
  name,
  label,
  options,
  placeholder,
  icon,
  register,
  rules,
  haveError,
  disabled,
}: SelectUIProps) {
  const selectClasses = classNames(
    "border rounded-[5px] p-1 pl-[12px] py-2 flex items-center gap-x-[14px] focus-within:border-text-color-black transition-colors duration-500 font-tahoma",
    {
      "border-secondary-text-color": !haveError,
      "border-danger": haveError,
      "bg-gray-300": disabled,
    }
  );
  return (
    <span className={"flex flex-col xs:w-72 w-full"}>
      <label className="mb-[5px] font-tahoma" htmlFor={name}>
        {label}
      </label>
      <span className={selectClasses}>
        {icon && <div className="text-secondary-text-color">{icon}</div>}
        <select
          className="outline-none w-full text-xs xs:text-base !bg-white h-6 disabled:!bg-gray-300"
          disabled={disabled}
          id={name}
          {...register(name, rules)}
        >
          <option value="" disabled selected>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </span>
  );
}
