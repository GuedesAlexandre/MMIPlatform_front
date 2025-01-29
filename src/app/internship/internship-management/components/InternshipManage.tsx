import { InternshipStudent } from "@/app/models/Internship";
import { Student } from "@/app/resources/models/student.model";
import InternshipDatatable from "./InternshipDatatable";

interface InternshipManageProps {
  student: Student;
  internship: InternshipStudent[];
}

const InternshipManage: React.FC<InternshipManageProps> = ({
  student,
  internship,
}) => {
  return (
    <>
      <div className="rounded-md border">
        {internship.map((internshipItem) => (
          <InternshipDatatable
            key={internshipItem.numEtu}
            studentInterships={internshipItem}
          />
        ))}
      </div>
    </>
  );
};
export default InternshipManage;
