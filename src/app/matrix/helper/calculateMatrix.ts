import { Student } from "@/app/matrix/models/students.model";
import { ueModule } from "@/app/matrix/models/ueModule.model";
import { Module } from "@/app/users/models/user.model";
import { dataMatrix } from "@/app/matrix/models/matrixStore.model";

export const groupeUtilsInformation = (
  students: Student[] | undefined,
  semester: string,
  modules: Module[] | undefined,
  ue: ueModule
) => {
  if (!students) return [];
  const studentsFiltredBySemester = getStudentBySemester(
    students,
    semester,
    modules,
    ue
  );
  return studentsFiltredBySemester;
};

const getStudentBySemester = (
  students: Student[],
  semester: string,
  modules: Module[] | undefined,
  ue: string
): dataMatrix[] => {
  if (!modules || modules.length === 0) return [];

  const studentsWithNotes = students.filter((student) =>
    student.notes.some(
      (note) => note.module.semester === semester && note.module.ueName === ue
    )
  );

  return studentsWithNotes.map((student) => {
    const studentNotes = calculNoteAverage(student, modules, semester);
    const studentAverage = calculStudentAverage(modules, studentNotes);
    return {
      name: `${student.firstName} ${student.lastName}`,
      group: student.group,
      IdStudent: student.numEtu,
      notes: studentNotes,
      average: studentAverage,
    };
  });
};

const calculNoteAverage = (
  student: Student,
  modules: Module[],
  semester: string
) => {
  const all_notes = student.notes.filter(
    (note) => note.module.semester === semester
  );
  const moduleMap: Record<string, { total: number; coeff: number }> = {};

  all_notes.forEach((note) => {
    const moduleName = note.module.name;

    if (!moduleMap[moduleName]) {
      moduleMap[moduleName] = { total: 0, coeff: 0 };
    }

    moduleMap[moduleName].total += note.note * note.coeff;
    moduleMap[moduleName].coeff += note.coeff;
  });

  const averages: Record<string, number> = {};
  for (const moduleName in moduleMap) {
    const { total, coeff } = moduleMap[moduleName];
    averages[moduleName] = total / coeff;
  }
  return fillAllNoteWhereHaveNosAverageInModule(modules, averages);
};

const fillAllNoteWhereHaveNosAverageInModule = (
  modules: Module[],
  averages: Record<string, number>
) => {
  modules.forEach((module) => {
    if (!(module.name in averages)) {
      averages[module.name] = 0;
    }
  });
  return averages;
};

const calculStudentAverage = (
  modules: Module[],
  studentNote: Record<string, number>
): number => {
  let totalNote = 0;
  let totalCoef = 0;

  modules.forEach((module) => {
    const note = studentNote[module.name] || 0;
    totalNote += note * module.coeff;
    totalCoef += module.coeff;
  });

  const average = totalNote / totalCoef;
  return average;
};
