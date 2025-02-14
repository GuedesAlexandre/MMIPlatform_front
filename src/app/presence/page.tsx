"use client";

import React, { useEffect, useState } from "react";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { FieldValues, useForm } from "react-hook-form";
import SelectUI from "@/app/components/ui/SelectUI";

import { getModuleByEmailStore } from "@/app/store/getResourcesByEmail.store";

import {
  createModulesArray,
  promoToSelectArray,
} from "@/app/presence/helper/getPromoInModule";
import GroupsBySwitch from "@/app/presence/components/GroupsBySwitch";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import { useStudentsByPromoAndGroup } from "@/app/store/useStudentByPromoAndGroup.store";
import { useStudentsSignatureStore } from "@/app/store/presence.store";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import { DataTable } from "@/app/presence/components/FormPresenceStudents";
import { columns } from "@/app/presence/helper/columnDef";
import withAuth from "@/app/HOC";

function Page() {
  const { setStudentAndSetingsWithoutStudentSignature, studentsSignatures } =
    useStudentsSignatureStore();
  const {
    register,
    trigger,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FieldValues>();

  const [promoToUser, setPromoToUser] = useState<
    { label: string; value: string }[]
  >([]);

  const [modules, setModules] = useState<{ label: string; value: string }[]>(
    []
  );

  const { setStudentByPromoAndGroupe } = useStudentsByPromoAndGroup();

  const [switchValue, setSwitchValue] = useState(true);

  const { user } = useAuthStore();

  const { moduleByEmail, fetchModuleByEmail } = getModuleByEmailStore();

  const selectedPromo = watch("promo");

  useEffect(() => {
    fetchModuleByEmail(String(user?.user.email));
  }, []);

  useEffect(() => {
    if (!moduleByEmail) return;
    setPromoToUser(promoToSelectArray(moduleByEmail));
  }, [moduleByEmail]);

  useEffect(() => {
    if (!selectedPromo || !moduleByEmail) return;
    setModules(createModulesArray(moduleByEmail, selectedPromo));
  }, [selectedPromo, moduleByEmail]);

  const onSubmit = (data: FieldValues) => {
    if (!data) return;

    setStudentByPromoAndGroupe(data.promo, data.groups).then((students) => {
      const dateFirst = new Date();
      const dateEnd = new Date(dateFirst);

      dateEnd.setTime(dateEnd.getTime() + data.hours * 60 * 60 * 1000);

      setStudentAndSetingsWithoutStudentSignature(
        students,
        data.promo,
        data.cours,
        dateFirst,
        dateEnd
      );
    });
  };

  const [isDisappearing, setIsDisappearing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (studentsSignatures) {
      setIsDisappearing(true);
      setTimeout(() => setIsHidden(true), 500);
    } else {
      setIsHidden(false);
      setTimeout(() => setIsDisappearing(false), 10);
    }
  }, [studentsSignatures]);

  return (
    <div>
      <TitleHeaderUI label="Présence des étudiants" />
      <div className={`${isHidden ? "hidden" : ""}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`max-w-6xl mx-auto p-6 shadow-md rounded-xl border border-placeholder-color 
                  transition-opacity duration-500 ease-out 
                  ${
                    isDisappearing
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div>
              <SelectUI
                name="promo"
                label="Promotion"
                placeholder="Sélectionner une promotion"
                register={register}
                rules={{ required: "Veuillez remplir ce champ." }}
                options={promoToUser}
              />
            </div>

            <div>
              <SelectUI
                name="hours"
                label="Nombres d'heures"
                placeholder="Sélectionner une heure"
                register={register}
                rules={{ required: "Veuillez remplir ce champ." }}
                options={[
                  { label: "2h00", value: 2 },
                  { label: "4h00", value: 4 },
                  { label: "6h00", value: 6 },
                  { label: "8h00", value: 8 },
                ]}
              />
            </div>

            <div>
              <SelectUI
                name="cours"
                disabled={!modules.length}
                label="Votre cours actuel"
                placeholder="Choisir votre cours actuel"
                register={register}
                rules={{ required: "Veuillez remplir ce champ." }}
                options={modules}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <GroupsBySwitch
                promo={selectedPromo}
                switchValue={switchValue}
                register={register}
                trigger={trigger}
                setValue={setValue}
              />
            </div>
          </div>
          <span className="ml-auto w-fit flex justify-end">
            <ButtonsUI
              type="submit"
              label="Créer une feuille de signature"
              customClassName="mt-5"
            />
          </span>
        </form>
      </div>

      <div className="!w-[75vw] justify-center mx-auto mt-6">
        {studentsSignatures?.students &&
          studentsSignatures?.students.length > 0 && (
            <DataTable
              data={studentsSignatures.students.sort(
                (a, b) =>
                  a.group.localeCompare(b.group, undefined, {
                    numeric: true,
                  }) || a.lastName.localeCompare(b.lastName)
              )}
              columns={columns}
            />
          )}
      </div>
    </div>
  );
}

export default withAuth(Page);
