export interface Student {
  id: null;
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  numEtu: string;
  notes: Note[];
}

export interface Note {
  id: null;
  coeff: number;
  name: string;
  note: number;
  module: ModuleNote;
  student: null;
}

export interface ModuleNote {
  id: null;
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
