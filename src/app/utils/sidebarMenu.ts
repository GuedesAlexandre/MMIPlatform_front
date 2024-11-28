import { Home, LayoutGrid, Frame, BadgeAlert, Box, UserPen } from "lucide-react";
import { User } from "../auth/models/User";

const menuForAdmin = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Gestion utilisateurs",
    url: "/users",
    icon: UserPen,
  },
  {
    title: "Ressources",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Matrices",
    url: "/dashboard",
    icon: Frame,
  },
  {
    title: "Absences",
    url: "/dashboard",
    icon: BadgeAlert,
  },
  {
    title: "Salles",
    url: "/dashboard",
    icon: Box,
  },
];

const menuForScolarity = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Absences",
    url: "/dashboard",
    icon: BadgeAlert,
  },
  {
    title: "Salles",
    url: "/dashboard",
    icon: Box,
  },
];

const menuForTeacher = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Ressources",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Matrices",
    url: "/dashboard",
    icon: Frame,
  },
  {
    title: "Absences",
    url: "/dashboard",
    icon: BadgeAlert,
  },
  {
    title: "Salles",
    url: "/dashboard",
    icon: Box,
  },
];
export const defineMenuSidebar = (user: User | undefined) => {
  if (user === undefined) {
    return [];
  }
  switch (user.user.access) {
    case "ADMIN":
      return menuForAdmin;
    case "SCOLARITY":
      return menuForScolarity;
    case "TEACHER":
      return menuForTeacher;
    default:
      return [];
  }
};
