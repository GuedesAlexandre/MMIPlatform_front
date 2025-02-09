"use client";
import Accordion from "@/app/components/accordion";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import {
  ArrowLeftIcon,
  Cross1Icon,
  Cross2Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InternshipManage from "./components/InternshipManage";
import { useInternshipStore } from "@/app/store/Internship.store";
import { Internship, InternshipStudent } from "@/app/models/Internship";
import { Student } from "@/app/resources/models/student.model";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, Info, Terminal } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

const InternshipManagement = () => {
  const searchParm = useSearchParams();
  const [numEtu] = useState<string | null>(searchParm.get("numEtu"));
  const [promo] = useState<string | null>(searchParm.get("promo"));
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  const [student, setStudent] = useState<Student>();
  const { internships, fetchInternships } = useInternshipStore();
  const [studentWithInternship, setStudentWithInternship] = useState<
    InternshipStudent[]
  >([]);

  useEffect(() => {
    if (!promo) return;
    setStudentByPromo(promo);
  }, [promo, setStudentByPromo]);

  useEffect(() => {
    if (studentsByPromo) {
      setStudent(studentsByPromo.find((student) => student.numEtu === numEtu));
    }
  }, [studentsByPromo, numEtu]);

  useEffect(() => {
    if (!promo) return;
    fetchInternships(promo);
  }, [promo, fetchInternships]);

  const [internshipValidated, setInternshipValidated] =
    useState<boolean>(false);

  useEffect(() => {
    if (internships) {
      setStudentWithInternship(
        internships.filter((student) => student.numEtu === numEtu)
      );

      let totalCount = 0;
      studentWithInternship.forEach((internship: InternshipStudent) => {
        internship.internships.forEach((i: Internship) => {
          if (i.type === "ALTERNANCE") {
            setInternshipValidated(true);
          }
          totalCount += i.weekCount;
        });
      });
      setCountOfInternship(totalCount);
    }
  }, [internships, numEtu]);

  const router = useRouter();

  const [countOfInternship, setCountOfInternship] = useState<number>(0);

  return (
    <>
      <div
        onClick={() => router.back()}
        className="flex flex-row items-center ml-10 cursor-pointer hover:underline w-fit pt-10"
      >
        <ArrowLeftIcon className="size-6 mr-1" />
        <p>Retour</p>
      </div>
      <TitleHeaderUI
        label={`Gestion des stages de ${student?.firstName} ${student?.lastName}`}
      ></TitleHeaderUI>

      <div className="px-10">
        <Alert className="p-4 my-4">
          <Terminal className="size-4" />
          <AlertTitle>Informations sur l&apos;étudiant</AlertTitle>
          <AlertDescription>
            {student?.firstName} {student?.lastName} - {student?.numEtu}
            {student?.group && ` - Groupe ${student?.group}`}
            <br></br>
            <div className="flex items-center gap-3">
              {" "}
              {internshipValidated
                ? "L'étudiant a validé son cota par l'alternance"
                : countOfInternship > 0
                ? `Nombre total de semaines de stage : ${countOfInternship}`
                : "Aucune semaine de stage enregistrée"}
              {countOfInternship > 25 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      className="cursor-pointer border border-success rounded-full p-1"
                    >
                      {<Info className="text-green-500" />}
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-green-100 text-green-800 p-3 rounded-md shadow-lg mt-2"
                    >
                      {
                        "L'étudiant a effectué son cota de stage pour le BUT MMI"
                      }
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : internshipValidated ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      className="cursor-pointer  border-success rounded-full"
                    >
                      {<Info className="text-green-500" />}
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-green-100 text-green-800 p-3 rounded-md shadow-lg mt-2"
                    >
                      {
                        "L'étudiant a validé son cota par l'alternance en 3ème année"
                      }
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-pointer border border-red-500 rounded-full p-1">
                      {<Cross2Icon className="text-red-500" />}
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-red-100 text-red-500 p-3 rounded-md shadow-lg mt-2"
                    >
                      {
                        "L'étudiant n'a pas effectué son cota de stage pour le BUT MMI"
                      }
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </AlertDescription>
        </Alert>
        <Accordion
          icon={<PersonIcon />}
          name={"Liste des stages"}
          open={false}
          data={
            student && (
              <InternshipManage
                student={student}
                internship={studentWithInternship}
              />
            )
          }
        />
      </div>
    </>
  );
};

export default InternshipManagement;
