export interface ButtonsUIProps {
  type: "submit" | "reset" | "button";
  disbled?: boolean;
  label?: string;
  customClassName?: string;
  icon?: React.ReactNode;
}
