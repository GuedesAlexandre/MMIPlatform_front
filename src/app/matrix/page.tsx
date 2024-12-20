"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PinBottomIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ueModule } from "@/app/matrix/models/ueModule.model";
import { exportMatrixByPromo } from "@/app/matrix/helper/exportMatrixByPromo";
import { studentsStore } from "@/app/store/student.store";
import { groupeUtilsInformation } from "./helper/calculateMatrix";
import TableMatrix from "@/app/matrix/components/matrixTable";

const Page = () => {
  const { students, setStudentsData } = studentsStore();
  const [semester, setSemester] = useState<string>("1");
  const [ueSelect, setUeSelect] = useState<ueModule>("UE_DEVELOPPER");
  const updateUE = (UE: ueModule) => {
    setUeSelect(UE);
    groupeUtilsInformation(students, semester, UE);
  };
  useEffect(() => {
    setStudentsData().then((students) =>
      groupeUtilsInformation(students, semester, ueSelect)
    );
  }, []);

  return (
    <div>
      <div>
        <TitleHeaderUI label="Visualisation des matrices MMI" />
        <div className="w-3/12 pl-10">
          <Label>Semestre :</Label>
          <Select
            value={semester}
            onValueChange={(value) => {
              setSemester(value);
              groupeUtilsInformation(students, value, ueSelect);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semestre 1</SelectItem>
              <SelectItem value="2">Semestre 2</SelectItem>
              <SelectItem value="3">Semestre 3</SelectItem>
              <SelectItem value="4">Semestre 4</SelectItem>
              <SelectItem value="5">Semestre 5</SelectItem>
              <SelectItem value="6">Semestre 6</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="px-10 py-5 flex flex-row justify-between flex-wrap">
          <div>
            <Button
              variant={"outline"}
              className="bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
              onClick={() => updateUE("UE_DEVELOPPER")}
            >
              UE Développer
            </Button>
            <Button
              variant={"outline"}
              className="bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
              onClick={() => updateUE("UE_COMPRENDRE")}
            >
              UE Comprendre
            </Button>
            <Button
              variant={"outline"}
              className="bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
              onClick={() => updateUE("UE_CONCEVOIR")}
            >
              UE Concevoir
            </Button>
            <Button
              variant={"outline"}
              className="bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
              onClick={() => updateUE("UE_EXPRIMER")}
            >
              UE Exprimer
            </Button>
            <Button
              variant={"outline"}
              className="bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color"
              onClick={() => updateUE("UE_ENTREPRENDRE")}
            >
              UE Entreprendre
            </Button>
          </div>
          <div
            className="flex flex-row items-center cursor-pointer hover:underline"
            onClick={() => exportMatrixByPromo(semester)}
          >
            <PinBottomIcon />
            <p className="ml-2">Exporter votre matrice</p>
          </div>
        </div>
        <div>
          <p>{semester}</p>
          <p>{ueSelect}</p>
        </div>
      </div>
      <div className="px-10">
        <Table className="overflow-x-scroll">
          <TableMatrix semester={semester} ueName={ueSelect} students={students}/>
        </Table>
      </div>
    </div>
  );
};

export default Page;
