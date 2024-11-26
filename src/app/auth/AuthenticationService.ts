import { User } from "./models/User";

export interface SkeletonItem {
  title: string;
  description: string;
  header?: React.ReactNode;
  className: string;
  icon?: JSX.Element;
  access: string;
  color?: string;
  category : string;
  url?: string;
}
const itemsForAdmin: SkeletonItem[] = [
  {
    title: "Gérer votre matrice",
    description:
      "Votre matrice vous permet de suivre en temps réel l’avancé de chaque ressources dans le semestre",
    className: "md:col-span-2",
    access: "ADMIN",
    color: "bg-[#1EAFD0]/20",
    category: "Matrices",
    url : new URL("../../public/assets/dashboard/excel.png", import.meta.url).toString()
  
  },
  {
    title: "Gérer vos intervenants",
    description:
      "Gérer vos intervenants comme des futures utilisateurs de MMIPlatform. Vous leurs donnez accès à leurs ressources afin qu’ils attribuent des notes à vos étudiants ",
    className: "md:col-span-1",
    access: "ADMIN",
    color: "bg-[#1EAFD0]/20",
    category: "Gestion des utilisateurs",
    url : new URL("../../public/assets/dashboard/user.png", import.meta.url).toString()
  },
  {
    title: "Gérer vos modules et évalutations",
    description:
      "Gérer vos ressources enseignées et créer des notes pour vos étudiants jusqu’à la fusion dans la matrice principale.",
    className: "md:col-span-1",
    access: "ADMIN",
    color: "bg-[#1EAFD0]/20",
    category: "Modules", 
    url : new URL("../../public/assets/dashboard/modules.jpg", import.meta.url).toString()
  },
  {
    title: "Visualiser votre établissement",
    description:
      "Visualiser votre établissement grâce à notre module de visualisation dans l’espace",
    className: "md:col-span-2",
    access: "ADMIN",
    color: "bg-[#1EAFD0]/20",
    category: "Visualisation 3D",
    url : new URL("../../public/assets/dashboard/3D.png", import.meta.url).toString()
  },
];

const itemsForScolarity: SkeletonItem[] = [
  {
    title: "Gérer les étudiants et intervenants",
    description: "Gérer les étudiants ainsi que les intervenants.",
    className: "md:col-span-2",
    access: "SCOLARITY",
    color: "bg-[#1EAFD0]/20",
    category: "Gestion des utilisateurs",
    url : new URL("../../public/assets/dashboard/user.png", import.meta.url).toString()
  },
  {
    title: "Gérer les absences et les rattrapages",
    description:
      "Gérer les absences dans les ressources et définissez des éventuels rattrapages",
    className: "md:col-span-1",
    access: "SCOLARITY",
    color: "bg-[#1EAFD0]/20",
    category: "Scolarité",
    url : new URL("../../public/assets/dashboard/missing.png", import.meta.url).toString()
  },
  {
    title: "Visualiser l’établissement",
    description:
      "Visualiser votre établissement grâce à notre module de visualisation dans l’espace",
    className: "md:col-span-1",
    access: "SCOLARITY",
    color: "bg-[#1EAFD0]/20",
    category: "Visualisation 3D",
    url : new URL("../../public/assets/dashboard/3D.png", import.meta.url).toString()
  },
];

const itemsForTeacher: SkeletonItem[] = [
  {
    title: "Visualisez votre matrice",
    description:
      "Votre matrice vous permet de suivre en temps réel l’avancé de chaque ressources dans le semestre",
    className: "md:col-span-2",
    access: "TEACHER",
    color: "bg-[#1EAFD0]/20",
    category: "Matrices",
    url : new URL("../../public/assets/dashboard/excel.png", import.meta.url).toString()
  },
  {
    title: "Gérer les absences et les rattrapages",
    description:
      "Gérer les absences dans les ressources et définissez des éventuels rattrapages",
    className: "md:col-span-1",
    access: "TEACHER",
    color: "bg-[#1EAFD0]/20",
    category: "Scolarité",
    url : new URL("../../public/assets/dashboard/user.png", import.meta.url).toString()
  },
  {
    title: "Gérer vos modules et évalutations",
    description:
      "Gérer vos ressources enseignées et créer des notes pour vos étudiants jusqu’à la fusion dans la matrice principale.",
    className: "md:col-span-1",
    access: "TEACHER",
    color: "bg-[#1EAFD0]/20",
    category: "Modules",
    url : new URL("../../public/assets/dashboard/modules.jpg", import.meta.url).toString()
  },
  {
    title: "Visualiser l’établissement",
    description:
      "Visualiser votre établissement grâce à notre module de visualisation dans l’espace",
    className: "md:col-span-2",
    access: "TEACHER",
    color: "bg-[#1EAFD0]/20",
    category: "Visualisation 3D",
    url : new URL("../../public/assets/dashboard/3D.png", import.meta.url).toString()
  },
];

export const defineDashboardActions = (user: User | undefined) => {
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
