import { StudentsTableAccordion } from "@/app/models/ui/studentsTableAccordion.model";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { transformToStudentTable } from "@/app/resources/helper/studentsToStudentsTable";
import { columns } from "@/app/resources/[resource]/studentsResourceColumn";
import { DataTable } from "@/app/resources/[resource]/components/resourceStudentDataTable";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface StudentData {
  NumEtu: string;
  lastName: string;
  firstName: string;
  promo: string;
  group: string;
  average: string;
}

const AccordionResourceTable = ({
  promo,
  ressourceName,
  ueName,
}: StudentsTableAccordion) => {
  const [inputStudentValue, setInputStudentValue] = useState<string>("");
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();

  useEffect(() => {
    setStudentByPromo(promo);
  }, []);

  const studentsTableData: StudentData[] = transformToStudentTable(
    studentsByPromo,
    ressourceName,
    ueName
  ).sort(
    (a, b) =>
      a.group.localeCompare(b.group, undefined, { numeric: true }) ||
      a.lastName.localeCompare(b.lastName)
  );
  const filteredStudents = studentsTableData?.filter((student) =>
    student.lastName.toLowerCase().includes(inputStudentValue.toLowerCase())
  );
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <Input
          type="text"
          placeholder="Rechercher par nom ..."
          className="w-2/4"
          value={inputStudentValue}
          onChange={(e) => setInputStudentValue(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={filteredStudents} />
    </div>
  );
};
export default AccordionResourceTable;
