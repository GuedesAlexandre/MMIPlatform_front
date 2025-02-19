import { Student } from "@/app/matrix/models/students.model";

export enum SignatureStatusEnum {
  ABS = "ABS",
  PRESENT = "PRESENT",
  NONE = "NONE",
}

export enum JustificationStatusEnum {
  NOT_JUSTIFIED = "NOT_JUSTIFIED",
  JUSTIFIED = "JUSTIFIED",
  JUSTSIGNED = "JUSTSIGNED",
}

export interface SignatureStudentData {
  studentWhoSign: Student;
  sign: SignatureStatusEnum;
  justification: JustificationStatusEnum;
}

export interface SignatureSheet {
  promo: string;
  moduleName: string;
  createdAt: Date;
  finishAt: Date;
  students: Student[];
  signatures?: SignatureStudentData[];
}
