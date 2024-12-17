import { Student } from "@/app/matrix/models/students.model";
import { ueModule } from "@/app/matrix/models/ueModule.model";

export const groupeUtilsInformation = (
  students: Student[] | undefined,
  semester: string,
  ue: ueModule
) => {
  const studentsFiltredBySemester = getStudentBySemester(students, semester);
};

const getStudentBySemester = (
  students: Student[] | undefined,
  semester: string
) => {
  if (!students) return [];
  const studentWithNote = students.filter(
    (student) => student.notes.length !== 0
  );
  return studentWithNote.filter((student) =>
    student.notes.find((note) => note.module.semester === semester)
  );
};
