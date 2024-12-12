"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useSearchParams } from "next/navigation";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import { useEffect } from "react";
import { studentsToStudentsControl } from "@/app/resources/helper/studentsToStudentsControl";
import TableNotes from "@/app/resources/[resource]/control/components/table";

const Control = () => {
  const searchParams = useSearchParams();
  const name: string | null = searchParams.get("name");
  const promo: string | null = searchParams.get("promo");
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  useEffect(() => {
    if (promo) setStudentByPromo(promo);
  }, []);
  const data = studentsToStudentsControl(studentsByPromo);
  return (
    <>
      {name && <TitleHeaderUI label={name} />}
      <div className="px-10">
        <TableNotes data={data} resource={name} />
      </div>
    </>
  );
};

export default Control;
