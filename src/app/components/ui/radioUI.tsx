import { RadioModelProps } from "@/app/models/ui/radio.model";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface RadioUIProps {
  radios: RadioModelProps[];
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  trigger?: (name: string) => void;
  CustomeClassName?: string;
}

function RadioUI({
  radios,
  name,
  register,
  setValue,
  trigger,
  CustomeClassName,
}: RadioUIProps) {
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | null>
  >({});

  const handleChange = (name: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);
    if (trigger) trigger(name);
  };

  return (
    <div className={cn("grid gap-3 w-fit", CustomeClassName)}>
      {radios.map(({ label, rules }, index) => (
        <div key={index} className="flex flex-col gap-1">
          <label
            htmlFor={`${name}-${index}`}
            className={cn(
              "flex items-center p-1 px-3 w-full border rounded cursor-pointer transition-colors",
              "border-placeholder-color hover:border-blue-500",
              selectedValues[name] === label && "bg-blue-100 border-blue-500"
            )}
          >
            <input
              type="radio"
              id={`${name}-${index}`}
              value={label}
              {...register(name, rules)}
              className="hidden"
              onChange={(e) => handleChange(name, e.target.value)}
            />
            <span className="text-sm font-medium text-center w-full">
              {label}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioUI;
