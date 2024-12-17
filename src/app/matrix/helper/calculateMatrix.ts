import { Student } from "@/app/matrix/models/students.model";
import { ueModule } from "@/app/matrix/models/ueModule.model";

export const groupeUtilsInformation = (
  students: Student[] | undefined,
  semester: string,
  ue: ueModule
) => {
  const studentsFiltredBySemester = getStudentBySemester(
    students,
    semester,
    ue
  );
  return studentsFiltredBySemester;
};

const getStudentBySemester = (
  students: Student[] | undefined,
  semester: string,
  ue: ueModule
) => {
  if (!students) return [];
  const studentWithNote = students.filter(
    (student) => student.notes.length !== 0
  );
  const filteredStudentNote = studentWithNote.filter(
    (student) =>
      student.notes.find((note) => note.module.semester === semester) &&
      student.notes.find((note) => note.module.ueName === ue)
  );
  // return filteredStudentNote;
  return filteredStudentNote.map((notes)=> {
    return {
      "name": notes.firstName + " " + notes.lastName,
      "group": notes.group,
      "numEtu": notes.numEtu,
      "note": [
        notes.notes.map((note) => {
          return {
            "resource": note.module.name,
            "note": note.note
          }
        })
      ],
      "average": 0,
      "results": "ADMIS"
    }
  })
};
