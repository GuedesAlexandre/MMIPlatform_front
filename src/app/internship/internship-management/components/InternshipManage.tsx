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
        {internship.length > 0 ? (
          internship.map((internshipItem) =>
           <InternshipDatatable key={internshipItem.numEtu} studentInterships={internshipItem} />
          )
        ) : (
          <>
            <p>Aucun stage Pour cette étudiant</p>
            <a>En ajouter un ?</a>
          </>
        )}
      </div>
    </>
  );
};

export default InternshipManage;
