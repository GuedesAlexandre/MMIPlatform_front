import { UserModules } from "@/app/auth/models/User";

export interface Student {
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  numEtu: string;
  modules: UserModules[];
}

export interface StudentsStore {
  studentsByPromo: Student[] | undefined;
  setStudentByPromo: (promo: string) => void;
}
