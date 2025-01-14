"use client";

import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PinBottomIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ueModule } from "@/app/matrix/models/ueModule.model";
import { exportMatrixByPromo } from "@/app/matrix/helper/exportMatrixByPromo";
import { studentsStore } from "@/app/store/student.store";
import TableMatrix from "@/app/matrix/components/matrixTable";
import withAuth from "@/app/HOC";

const Page = () => {
  const { students, setStudentsData } = studentsStore();
  const [semester, setSemester] = useState<string>("1");
  const [ueSelect, setUeSelect] = useState<ueModule>("UE_DEVELOPPER");
  const updateUE = (UE: ueModule) => {
    setUeSelect(UE);
  };
  useEffect(() => {
    setStudentsData();
  }, []);

  return (
    <>
      <div>
        <div>
          <TitleHeaderUI label="Visualisation des matrices MMI" />
          <div className="pl-10 flex flex-row items-center w-1/2">
            <div className="w-1/3">
              <Label>Semestre :</Label>
              <Select
                value={semester}
                onValueChange={(value) => {
                  setSemester(value);
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
            <div
              className="flex flex-row items-center cursor-pointer hover:underline pt-5 ml-10"
              onClick={() => exportMatrixByPromo(semester)}
            >
              <PinBottomIcon />
              <p className="ml-2">Exporter votre matrice</p>
            </div>
          </div>
          <div className="px-10 py-5 flex flex-row flex-wrap w-10/12">
            <div>
              <Button
                variant={"outline"}
                className={
                  ueSelect === "UE_DEVELOPPER"
                    ? "bg-primary-blue-hover text-background-color mr-2 hover:bg-primary-blue-hover hover:text-background-color cursor-default"
                    : "bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
                }
                onClick={() => updateUE("UE_DEVELOPPER")}
              >
                UE Développer
              </Button>
              <Button
                variant={"outline"}
                className={
                  ueSelect === "UE_ENTREPRENDRE"
                    ? "bg-primary-blue-hover text-background-color mr-2 hover:bg-primary-blue-hover hover:text-background-color cursor-default"
                    : "bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
                }
                onClick={() => updateUE("UE_ENTREPRENDRE")}
              >
                UE Entreprendre
              </Button>
              {!(semester === "5" || semester === "6") && (
                <>
                  <Button
                    variant={"outline"}
                    className={
                      ueSelect === "UE_COMPRENDRE"
                        ? "bg-primary-blue-hover text-background-color mr-2 hover:bg-primary-blue-hover hover:text-background-color cursor-default"
                        : "bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
                    }
                    onClick={() => updateUE("UE_COMPRENDRE")}
                  >
                    UE Comprendre
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      ueSelect === "UE_CONCEVOIR"
                        ? "bg-primary-blue-hover text-background-color mr-2 hover:bg-primary-blue-hover hover:text-background-color cursor-default"
                        : "bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
                    }
                    onClick={() => updateUE("UE_CONCEVOIR")}
                  >
                    UE Concevoir
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      ueSelect === "UE_EXPRIMER"
                        ? "bg-primary-blue-hover text-background-color mr-2 hover:bg-primary-blue-hover hover:text-background-color cursor-default"
                        : "bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
                    }
                    onClick={() => updateUE("UE_EXPRIMER")}
                  >
                    UE Exprimer
                  </Button>
                </>
              )}
              <Button
                variant={"outline"}
                className={
                  ueSelect === "synthese"
                    ? "bg-primary-blue-hover text-background-color mr-2 hover:bg-primary-blue-hover hover:text-background-color cursor-default"
                    : "bg-primary-blue hover:bg-primary-blue-hover text-background-color hover:text-background-color mr-2"
                }
                onClick={() => updateUE("synthese")}
              >
                Synthèse
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10">
        <div className="w-[80vw] overflow-x-auto block pb-10">
          <TableMatrix
            semester={semester}
            ueName={ueSelect}
            students={students}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(Page);
