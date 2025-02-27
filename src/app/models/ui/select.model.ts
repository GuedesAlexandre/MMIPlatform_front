import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface SelectUIProps {
  name: string;
  label: string;
  options: { label: string | number; value: string | number }[];
  placeholder?: string;
  icon?: React.ReactNode;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  haveError?: boolean;
  disabled?: boolean;
}
