import { PersonIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import InputUI from "@/app/components/ui/InputUI";
import SelectUI from "@/app/components/ui/SelectUI";

function AccordionPersonalInfo({
  register,
  errors,
  trigger,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  trigger: (field: string) => Promise<boolean>;
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
        <div className="pb-10 px-10 grid lg:grid-cols-2 lg:gap-x-10 gap-y-5 gap-10 lg:pr-60">
          <InputUI
            type="text"
            name="firstName"
            label="Prénom"
            placeholder="Entrer le prénom"
            register={register}
            errors={errors}
            trigger={trigger}
            rules={{
              required: "Veuillez remplir ce champ.",
              pattern: {
                value: /^[A-Za-zÀ-ÿéèàêëôùïçÇ-]+$/,
                message: "Veuillez indiquer un prénom valide.",
              },
            }}
          />
          <InputUI
            type="text"
            name="name"
            label="Nom"
            placeholder="Entrer le nom"
            register={register}
            errors={errors}
            trigger={trigger}
            rules={{
              required: "Veuillez remplir ce champ.",
              pattern: {
                value: /^[A-Za-zÀ-ÿéèàêëôùïçÇ-]+$/,
                message: "Veuillez indiquer un nom valide.",
              },
            }}
          />
          <InputUI
            type="text"
            name="username"
            label="Nom d’utilisateur"
            placeholder="Entrer le nom d’utilisateur"
            register={register}
            errors={errors}
            trigger={trigger}
            rules={{ required: "Veuillez remplir ce champ." }}
          />
          <InputUI
            type="text"
            name="phone"
            label="Numéro de téléphone"
            placeholder="Entrer le numéro de téléphone"
            register={register}
            errors={errors}
            trigger={trigger}
            rules={{
              required: "Veuillez remplir ce champ.",
              pattern: {
                value: /^(\+33|0)[1-9](\d{2}){4}$/,
                message: "Veuillez indiquer un numéro valide.",
              },
            }}
          />
          <InputUI
            type="text"
            name="email"
            label="Email"
            placeholder="Entrer l’adresse mail"
            register={register}
            errors={errors}
            trigger={trigger}
            rules={{
              required: "Veuillez remplir ce champ.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Veuillez indiquer une adresse e-mail valide.",
              },
            }}
          />
          <InputUI
            type="text"
            name="address"
            label="Adresse"
            placeholder="Entrer l’adresse de résidence"
            register={register}
            rules={{
              required: "Veuillez remplir ce champ.",
            }}
            errors={errors}
            trigger={trigger}
          />
          <InputUI
            type="text"
            name="city"
            label="Ville"
            placeholder="Entrer la ville de résidence"
            register={register}
            rules={{
              required: "Veuillez remplir ce champ.",
            }}
            errors={errors}
            trigger={trigger}
          />
          <InputUI
            type="text"
            name="country"
            label="Pays"
            placeholder="Entrer le pays de résidence"
            register={register}
            rules={{
              required: "Veuillez remplir ce champ.",
            }}
            errors={errors}
            trigger={trigger}
          />
          <SelectUI
            name="establishment"
            label="Établissement"
            placeholder="Sélectionner l’établissement d’enseignement"
            register={register}
            rules={{
              required: "Veuillez remplir ce champ.",
            }}
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
