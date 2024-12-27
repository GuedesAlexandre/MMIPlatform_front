import { SkeletonItem } from "@/app/dashboard/models/SkeletonItem.model";
import { UserSessionJWT } from "@/app/models/UserSessionJWT";

const itemsForAdmin: SkeletonItem[] = [
  {
    title: "Gérer votre matrice",
    description:
      "Votre matrice vous permet de suivre en temps réel l’avancé de chaque ressources dans le semestre",
    className: "md:col-span-1",
    access: "ADMIN",
    color: "yellow",
    category: "Matrices",
    url: new URL(
      "../../../public/assets/dashboard/excel.png",
      import.meta.url
    ).toString(),
    link: "/matrix",
  },
  {
    title: "Gérer vos intervenants",
    description:
      "Gérer vos intervenants comme des futures utilisateurs de MMIPlatform. Vous leurs donnez accès à leurs ressources afin qu’ils attribuent des notes à vos étudiants.",
    className: "md:col-span-2",
    access: "ADMIN",
    color: "green",
    category: "Utilisateurs",
    url: new URL(
      "../../../public/assets/dashboard/user.png",
      import.meta.url
    ).toString(),
    link: "/users",
  },
  {
    title: "Gérer vos Ressources et évalutations",
    description:
      "Gérer vos ressources enseignées et créer des notes pour vos étudiants jusqu’à la fusion dans la matrice principale.",
    className: "md:col-span-2",
    access: "ADMIN",
    color: "blue",
    category: "Modules",
    url: new URL(
      "../../../public/assets/dashboard/modules.jpg",
      import.meta.url
    ).toString(),
    link: "/resources",
  },
  {
    title: "Visualiser votre établissement",
    description:
      "Visualiser votre établissement grâce à notre ressource de visualisation dans l’espace.",
    className: "md:col-span-1",
    access: "ADMIN",
    color: "purple",
    category: "Visualisation 3D",
    link: "/3Dpages",
    url: new URL(
      "../../../public/assets/dashboard/3D.png",
      import.meta.url
    ).toString(),
  },
];

const itemsForScolarity: SkeletonItem[] = [
  {
    title: "Gérer les absences et les rattrapages",
    description:
      "Gérer les absences dans les ressources et définissez des éventuels rattrapages",
    className: "md:col-span-3",
    access: "SCOLARITY",
    color: "purple",
    category: "Scolarité",
    url: new URL(
      "../../../public/assets/dashboard/missing.png",
      import.meta.url
    ).toString(),
    link: "/scolarity",
  },
  {
    title: "Gérer votre matrice",
    description:
      "Votre matrice vous permet de suivre en temps réel l’avancé de chaque ressources dans le semestre",
    className: "md:col-span-2",
    access: "ADMIN",
    color: "yellow",
    category: "Matrices",
    url: new URL(
      "../../../public/assets/dashboard/excel.png",
      import.meta.url
    ).toString(),
    link: "/matrix",
  },

  {
    title: "Visualiser l’établissement",
    description:
      "Visualiser votre établissement grâce à notre module de visualisation dans l’espace.",
    className: "md:col-span-1",
    access: "SCOLARITY",
    color: "orange",
    link: "/3Dpages",
    category: "Visualisation 3D",
    url: new URL(
      "../../../public/assets/dashboard/3D.png",
      import.meta.url
    ).toString(),
  },
];

const itemsForTeacher: SkeletonItem[] = [
  {
    title: "Visualisez votre matrice",
    description:
      "Votre matrice vous permet de suivre en temps réel l’avancé de chaque ressources dans le semestre.",
    className: "md:col-span-1",
    access: "TEACHER",
    color: "green",
    category: "Matrices",
    url: new URL(
      "../../../public/assets/dashboard/excel.png",
      import.meta.url
    ).toString(),
    link: "/matrix",
  },
  {
    title: "Gérer les absences et les rattrapages",
    description:
      "Gérer les absences dans les ressources et définissez des éventuels rattrapages.",
    className: "md:col-span-2",
    access: "TEACHER",
    color: "purple",
    category: "Scolarité",
    url: new URL(
      "../../../public/assets/dashboard/user.png",
      import.meta.url
    ).toString(),
    link: "/scolarity",
  },
  {
    title: "Gérer vos modules et évalutations",
    description:
      "Gérer vos ressources enseignées et créer des notes pour vos étudiants jusqu’à la fusion dans la matrice principale.",
    className: "md:col-span-1",
    access: "TEACHER",
    color: "blue",
    category: "Modules",
    url: new URL(
      "../../../public/assets/dashboard/modules.jpg",
      import.meta.url
    ).toString(),
    link: "/resources",
  },
  {
    title: "Visualiser l’établissement",
    description:
      "Visualiser votre établissement grâce à notre ressource de visualisation dans l’espace.",
    className: "md:col-span-2",
    access: "TEACHER",
    color: "orange",
    category: "Visualisation 3D",
    url: new URL(
      "../../../public/assets/dashboard/3D.png",
      import.meta.url
    ).toString(),
    link: "/3Dpages",
  },
];

export const defineDashboardActions = (user: UserSessionJWT | undefined) => {
  if (user === undefined) {
    return [];
  }
  switch (user.user.access) {
    case "ADMIN":
      return itemsForAdmin;
    case "SCOLARITY":
      return itemsForScolarity;
    case "TEACHER":
      return itemsForTeacher;
    default:
      return [];
  }
};
