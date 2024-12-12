import { Student } from "@/app/resources/models/student.model";

export const transformToStudentTable = (
  data: Student[] | undefined,
  moduleName: string,
  ueName: string
) => {
  if (data === undefined) return [];
  return data.map((student) => {
    const filteredNotes = student.notes
      .filter(
        (note) =>
          note.module.name === moduleName && note.module.ueName === ueName
      )
      .map((note) => ({
        note: note.note,
        coeff: note.coeff,
      }));

    const coeffSum = filteredNotes.reduce((sum, item) => sum + item.coeff, 0);
    const weightedSum = filteredNotes.reduce(
      (sum, item) => sum + item.note * item.coeff,
      0
    );
    const average = coeffSum > 0 ? weightedSum / coeffSum : 0;

    return {
      NumEtu: student.numEtu,
      lastName: student.lastName,
      firstName: student.firstName,
      promo: student.promo,
      group: student.group,
      average: average.toFixed(2),
    };
  });
};
