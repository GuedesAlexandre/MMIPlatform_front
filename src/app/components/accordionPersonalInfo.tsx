import { PersonIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import InputUI from "./ui/InputUI";
import { FieldValues, UseFormRegister } from "react-hook-form";
import SelectUI from "./ui/SelectUI";

function AccordionPersonalInfo({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-placeholder-color border rounded-md">
      <div
        className="flex flex-row justify-between px-4 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-row items-center">
          <PersonIcon className="mr-2" />
          <p className="w-fit select-none">Informations personnels</p>
        </div>
        {open ? (
          <ChevronDown onClick={() => setOpen(!open)} />
        ) : (
          <ChevronRight onClick={() => setOpen(!open)} />
        )}
      </div>
      {open && (
        <div className="pb-10 px-10 grid lg:grid-cols-2 lg:gap-x-10 gap-y-5 gap-10 pr-60">
          <InputUI
            type="text"
            name="Prénom"
            label="Prénom"
            placeholder="Entrer le prénom"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
          <InputUI
            type="text"
            name="Nom"
            label="Nom"
            placeholder="Entrer le nom"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
          <InputUI
            type="text"
            name="Nom d’utilisateur"
            label="Nom d’utilisateur"
            placeholder="Entrer le nom d’utilisateur"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
          <InputUI
            type="text"
            name="Numéro de téléphone"
            label="Numéro de téléphone"
            placeholder="Entrer le numéro de téléphone"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
          <InputUI
            type="text"
            name="Email"
            label="Email"
            placeholder="Entrer l’adresse mail"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
          <InputUI
            type="text"
            name="Adresse"
            label="Adresse"
            placeholder="Entrer l’adresse de résidence"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />{" "}
          <InputUI
            type="text"
            name="Ville"
            label="Ville"
            placeholder="Entrer la ville de résidence"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />{" "}
          <InputUI
            type="text"
            name="Pays origine"
            label="Pays"
            placeholder="Entrer le pays de résidence"
            register={register}
            rules={{ required: true }}
            //   haveError={error}
          />
          <SelectUI
            name="Établissement"
            label="Établissement"
            placeholder="Sélectionner l’établissement d’enseignement"
            register={register}
            rules={{ required: true }}
            options={[
              { label: "IUT-Meaux", value: "Meaux" },
              { label: "IUT-Champ sur Marne", value: "Champ sur Marne" },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default AccordionPersonalInfo;
