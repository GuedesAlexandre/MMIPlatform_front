import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface InputUIProps {
  type: "text" | "password";
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  haveError?: boolean;
  errors?: FieldErrors<FieldValues>;
  trigger?: (field: string) => Promise<boolean>;
}
