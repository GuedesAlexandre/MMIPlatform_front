import RadioUI from "@/app/components/ui/radioUI";
import { RadioModelProps } from "@/app/models/ui/radio.model";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { createArrayRadioUI } from "../helper/createArrayRadioUIPromo";
import { Label } from "@/components/ui/label";

function GroupsBySwitch({
  switchValue,
  register,
  trigger,
  setValue,
  promo,
}: {
  switchValue: boolean;
  register: UseFormRegister<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  trigger: (field: string) => Promise<boolean>;
  setValue: UseFormSetValue<FieldValues>;
  promo: string;
}) {
  const [arrayRadiosData, setArrayRadiosData] = useState<RadioModelProps[]>([]);

  useEffect(() => {
    setArrayRadiosData(createArrayRadioUI(promo, switchValue));
  }, [switchValue, promo]);

  return (
    <>
      {arrayRadiosData.length !== 0 && <Label>Groupe</Label>}
      <RadioUI
        name="groups"
        radios={arrayRadiosData}
        register={register}
        setValue={setValue}
        trigger={trigger}
        CustomeClassName="grid-cols-3"
      />
    </>
  );
}

export default GroupsBySwitch;
