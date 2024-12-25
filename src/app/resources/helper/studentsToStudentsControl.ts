import { Student } from "@/app/resources/models/student.model";

export const studentsToStudentsControl = (
  data: Student[] | undefined,
  modifyControl?: string | null
) => {
  if (!data) return [];

  return data.map((student) => {
    const matchedNote = modifyControl
      ? student.notes.find((note) => note.name === modifyControl)?.note
      : undefined;
    const matchedCoeff = modifyControl
      ? student.notes.find((note) => note.name === modifyControl)?.coeff
      : undefined;
    const matchedStatute = modifyControl
      ? student.notes.find((note) => note.name === modifyControl)
      : undefined;

    return {
      numEtu: student.numEtu,
      lastName: student.lastName,
      firstName: student.firstName,
      promo: student.promo,
      group: student.group,
      notes: matchedNote ?? 0,
      coeff: matchedCoeff ?? 1,
      statut: matchedStatute?.status ?? "DONE",
    };
  });
};
