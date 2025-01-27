import { RegisterOptions } from "react-hook-form";

export interface RadioModelProps {
  label: string;
  rules?: RegisterOptions;
  haveError?: boolean;
  trigger?: (field: string) => Promise<boolean>;
}
