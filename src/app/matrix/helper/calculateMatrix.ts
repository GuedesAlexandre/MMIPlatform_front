import { Student } from "@/app/matrix/models/students.model";
import { ueModule } from "@/app/matrix/models/ueModule.model";

export const groupeUtilsInformation = (
  students: Student[] | undefined,
  semester: string,
  ue: ueModule
) => {
  const studentsFiltredBySemester = getStudentBySemester(students, semester);
  console.log(studentsFiltredBySemester);
  console.log(semester);
  console.log(ue);
};

const getStudentBySemester = (
  students: Student[] | undefined,
  semester: string
) => {
  if (!students) return [];
  const temp2 = students.filter((student) => student.notes.length !== 0);
  return temp2.filter((student) => {
    return student.notes.filter((note) => note.module.semester === semester);
  });
};
