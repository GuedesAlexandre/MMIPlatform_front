import { Student } from "@/app/models/student.model"

export const transformToStudentTable = (
  data: Student[] | undefined,
  moduleName: string,
  ueName: string
) => {
  if (data === undefined) return [];
  return data.map((student) => {
    const targetModule = student.modules.find(
      (module) => module.name === moduleName && module.ueName === ueName
    );
    return {
      NumEtu: student.numEtu,
      lastName: student.lastName,
      firstName: student.firstName,
      promo: student.promo,
      group: student.group,
      average: targetModule?.sum || 0,
    };
  });
};
