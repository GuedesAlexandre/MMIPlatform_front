export interface Student {
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  numEtu: string;
  notes: Note[];
}

export interface Note {
  coeff: number;
  name: string;
  note: number;
  module: ModuleNote;
  status: Status;
}

export interface ModuleNote {
  name: string;
  promo: string;
  semester: string;
  coeff: number;
  ueName: string;
}
export enum Status {
  ABS = "ABS",
  DEF = "DEF",
  DONE = "DONE",
  MAKEUP = "MAKEUP",
}
export interface StudentsStore {
  studentsByPromo: Student[] | undefined;
  setStudentByPromo: (promo: string) => void;
}
