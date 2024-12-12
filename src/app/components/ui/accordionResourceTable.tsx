import { StudentsTableAccordion } from "@/app/models/ui/studentsTableAccordion.model";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo";
import { transformToStudentTable } from "@/app/resources/helper/studentsToStudentsTable";
import { columns } from "@/app/resources/[resource]/studentsResourceColumn";
import { DataTable } from "@/app/components/ui/resourceStudentDataTable";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

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

  const studentsTableData = transformToStudentTable(
    studentsByPromo,
    ressourceName,
    ueName
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
