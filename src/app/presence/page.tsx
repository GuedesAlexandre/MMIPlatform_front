"use client";

import React, { useEffect, useState } from "react";
import TitleHeaderUI from "../components/ui/TitleHeaderUI";
import { FieldValues, useForm } from "react-hook-form";
import SelectUI from "../components/ui/SelectUI";
import { useAuthStore } from "../store/AuthRepository.store";
import { getModuleByEmailStore } from "../store/getResourcesByEmail.store";
import {
  createModulesArray,
  promoToSelectArray,
} from "./helper/getPromoInModule";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import GroupsBySwitch from "./components/GroupsBySwitch";

function Page() {
  const {
    register,
    trigger,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  const [promoToUser, setPromoToUser] = useState<
    { label: string; value: string }[]
  >([]);

  const [modules, setModules] = useState<{ label: string; value: string }[]>(
    []
  );

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

  return (
    <>
      <TitleHeaderUI label="Présence des étudiants" />
      <form
        autoComplete="off"
        className="max-w-6xl mx-auto p-6  shadow-md rounded-xl border border-placeholder-color"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div>
            <SelectUI
              name="promo"
              label="Promotion"
              placeholder="MMI..."
              register={register}
              rules={{ required: "Veuillez remplir ce champ." }}
              options={promoToUser}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Label>Groupe</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="groups">TP</Label>
              <Switch
                id="groups"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <Label htmlFor="groups">TD/CM</Label>
            </div>
            <GroupsBySwitch
              switchValue={switchValue}
              register={register}
              trigger={trigger}
              setValue={setValue}
            />
          </div>

          <div>
            <SelectUI
              name="hours"
              label="Votre horaire"
              placeholder="8h..."
              register={register}
              rules={{ required: "Veuillez remplir ce champ." }}
              options={[
                { label: "8h30 - 10h30", value: "8h30 - 10h30" },
                { label: "10h45 - 12h45", value: "10h45 - 12h45" },
                { label: "13h45 - 15h45", value: "13h45 - 15h45" },
                { label: "16h00 - 18h00", value: "16h00 - 18h00" },
              ]}
            />
          </div>

          <div>
            <SelectUI
              name="cours"
              disabled={!modules.length}
              label="Votre cours actuel"
              placeholder="Cours"
              register={register}
              rules={{ required: "Veuillez remplir ce champ." }}
              options={modules}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Page;
