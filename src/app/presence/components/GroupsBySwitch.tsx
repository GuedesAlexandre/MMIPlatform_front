import RadioUI from "@/app/components/ui/radioUI";
import React from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

function GroupsBySwitch({
  switchValue,
  register,
  trigger,
  setValue,
}: {
  switchValue: boolean;
  register: UseFormRegister<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  trigger: (field: string) => Promise<boolean>;
  setValue: UseFormSetValue<FieldValues>;
}) {
  return switchValue ? (
    <RadioUI
      name="Groups"
      radios={[
        { label: "TD-1" },
        { label: "TD-2" },
        { label: "TD-3" },
        { label: "CM" },
      ]}
      register={register}
      setValue={setValue}
      trigger={trigger}
      CustomeClassName="grid-cols-3"
    />
  ) : (
    <div>
      <RadioUI
        name="Groups"
        radios={[
          { label: "TP-A" },
          { label: "TP-B" },
          { label: "TP-C" },
          { label: "TP-D" },
          { label: "TP-E" },
          { label: "TP-F" },
        ]}
        register={register}
        setValue={setValue}
        trigger={trigger}
        CustomeClassName="grid-cols-3"
      />
    </div>
  );
}

export default GroupsBySwitch;
