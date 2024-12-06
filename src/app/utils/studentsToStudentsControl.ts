import { Student } from "@/app/models/student.model";

export const studentsToStudentsControl = (data: Student[] | undefined) => {
  if (data === undefined) return [];
  return data.map((student) => {
    return {
      numEtu: student.numEtu,
      lastName: student.lastName,
      firstName: student.firstName,
      promo: student.promo,
      group: student.group,
      note: 0,
    };
  });
};
