import { Student } from "@/app/matrix/models/students.model";

export enum SignatureStatusEnum {
  ABS = "ABS",
  PRESENT = "PRESENT",
  NONE = "NONE",
}

export interface SignatureStudentData {
  studentWhoSign: Student;
  sign: SignatureStatusEnum;
}

export interface SignatureSheet {
  promo: string;
  moduleName: string;
  createdAt: Date;
  finishAt: Date;
  students: Student[];
  signatures?: SignatureStudentData[];
}
