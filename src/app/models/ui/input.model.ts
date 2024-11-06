export interface InputUIProps {
  type: "text" | "password";
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
}
