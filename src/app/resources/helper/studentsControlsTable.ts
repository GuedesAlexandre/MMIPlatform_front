import { Student } from "../models/student.model";

export const studentsControlTable = (students: Student[] | undefined, resourceName: string) => {
  const uniqueControlsMap = new Map<string, number>();

  students?.forEach((student) => {
    student.notes.forEach((note) => {
      if (!uniqueControlsMap.has(note.name) && note.module.name === resourceName) {
        uniqueControlsMap.set(note.name, note.coeff);
      }
    });
  });

  return Array.from(uniqueControlsMap.entries()).map(([name, coeff]) => ({
    name,
    coeff,
  }));
};
