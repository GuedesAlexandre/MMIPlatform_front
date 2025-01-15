"use client";

import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { studentsControlTable } from "@/app/resources/helper/studentsControlsTable";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { toSlug } from "@/app/utils/textToSlug";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircleIcon } from "lucide-react";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

const AccordionControlTable = ({
  promo,
  resourceName,
}: {
  promo: string;
  resourceName: string;
}) => {
  const { studentsByPromo, setStudentByPromo } = useStudentsByPromo();
  const router = useRouter();

  useEffect(() => {
    setStudentByPromo(promo);
  }, []);
  const controls = studentsControlTable(studentsByPromo, resourceName);
  const titlePathname = toSlug(resourceName);

  const alertMakeUp = (name: string): boolean => {
    let isMakeUp = false;
    studentsByPromo?.forEach((student) => {
      student.notes.forEach((note) => {
        if (note.name === name && note.status === "MAKEUP") {
          isMakeUp = true;
        }
      });
    });
    return isMakeUp;
  };

  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Nom du contrôle</TableHead>
            <TableHead>Coefficient</TableHead>
            <TableHead>Actions à réaliser</TableHead>
            <TableHead>Modifer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.map((control) => (
            <TableRow key={control.name}>
              <TableCell>{control.name}</TableCell>
              <TableCell>{control.coeff}</TableCell>
              <TableCell className="flex flex-row items-center justify-start">
                {alertMakeUp(control.name) ? (
                <p className="text-danger">
                Un ou plusieurs élèves ont la possibilité
                d&apos;effectuer un rattrapage
                </p>
                ) : (
                <p>Aucune action à réaliser</p>
                )}
              
                </TableCell>
              <TableCell>
                <span
                  className="flex flex-row items-center cursor-pointer w-fit hover:underline"
                  onClick={() => {
                    router.push(
                      `${titlePathname}/control?name=${resourceName}&promo=${promo}&control=${control.name}`
                    );
                  }}
                >
                  <p>Modifier le contrôle</p>
                  <ArrowRightIcon className="ml-2" />
                </span>
              </TableCell>
              
            </TableRow>
          ))}
          {controls.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                Aucun contrôle pour cette ressource.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default AccordionControlTable;
