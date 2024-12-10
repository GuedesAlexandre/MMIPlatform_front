import {
  FieldError,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
export interface InputTooltipUIProps {
  type: "text" | "password";
  name: string;
  label: string;
  icon?: React.ReactNode;
  message?: React.ReactNode;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  haveError?: boolean;
  errors: FieldErrors<FieldValues>;
  trigger: (field: string) => Promise<boolean>;
}
