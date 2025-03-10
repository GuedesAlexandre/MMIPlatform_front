export interface storeStudent {
  students: Student[] | undefined;
  setStudentsData: () => Promise<Student[] | undefined>;
}

export interface Student {
  id?: null;
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  numEtu: string;
  notes: Note[];
}

interface Note {
  coeff: number;
  name: string;
  note: number;
  status: Status;
  module: Module;
  student: null;
}

export interface Module {
  name: string;
  promo: string;
  semester: string;
  coeff: number;
  ueName: string;
  sumNote: number;
}

enum Status {
  ABS = "ABS",
  DEF = "DEF",
  DONE = "DONE",
  MAKEUP = "MAKEUP",
}
