import {
  Home,
  LayoutGrid,
  Frame,
  BadgeAlert,
  Box,
  UserPen,
  BriefcaseBusiness,
  Clock,
} from "lucide-react";
import { UserSessionJWT } from "@/app/models/UserSessionJWT";

const menuForAdmin = [
  {
    title: "Accueil",
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
    url: "/resources",
    icon: LayoutGrid,
  },
  {
    title: "Présence",
    url: "/presence",
    icon: Clock,
  },
  {
    title: "Matrices",
    url: "/matrix",
    icon: Frame,
  },

  {
    title: "Gestion des stages",
    url: "/internship",
    icon: BriefcaseBusiness,
  },
  {
    title: "Salles",
    url: "/3Dpages",
    icon: Box,
  },
];

const menuForScolarity = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Absences",
    url: "/scolarity",
    icon: BadgeAlert,
  },
  {
    title: "Matrices",
    url: "/matrix",
    icon: Frame,
  },
  {
    title: "Salles",
    url: "/3Dpages",
    icon: Box,
  },
];

const menuForTeacher = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Ressources",
    url: "/resources",
    icon: LayoutGrid,
  },
  {
    title: "Présence",
    url: "/presence",
    icon: Clock,
  },
  {
    title: "Matrices",
    url: "/matrix",
    icon: Frame,
  },
  {
    title: "Salles",
    url: "/3Dpages",
    icon: Box,
  },
];
export const defineMenuSidebar = (user: UserSessionJWT | undefined) => {
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
