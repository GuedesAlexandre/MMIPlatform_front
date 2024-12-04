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
}

export interface ModuleNote {
  name: string;
  promo: string;
  semester: string;
  coeff: number;
  ueName: string;
}

export interface StudentsStore {
  studentsByPromo: Student[] | undefined;
  setStudentByPromo: (promo: string) => void;
}
