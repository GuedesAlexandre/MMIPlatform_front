import InputToolTipUI from "@/app/components/ui/InputToolTipUI";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

function FormSecurity({
  register,
  errors,
  trigger,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  trigger: (field: string) => Promise<boolean>;
}) {
  return (
    <div className="pb-10 px-10 grid lg:grid-cols-2 lg:gap-x-10 gap-y-5 gap-10 lg:pr-60">
      <InputToolTipUI
        type="password"
        name="password"
        label="Mot de passe"
        trigger={trigger}
        icon={<QuestionMarkCircledIcon />}
        message={
          <div className="ml-3 bg-blue-50 border border-blue-200 p-3 rounded-xl shadow-md">
            <h4 className="text-sm font-semibold text-blue-600 mb-2">
              Votre mot de passe
            </h4>
            <ul>
              <li>Le mot de passe doit contenir au moins 8 caractères.</li>
              <li>Il doit inclure au moins un chiffre.</li>
              <li>Il doit contenir au moins une lettre minuscule.</li>
              <li>Il doit contenir au moins une lettre majuscule.</li>
              <li>Il doit inclure un caractère spécial.</li>
            </ul>
          </div>
        }
        placeholder="Entrer le mot de passe"
        register={register}
        rules={{
          required: "Veuillez remplir ce champ.",
          pattern: {
            value:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
            message:
              "Votre mot de passe ne respecte pas la politique de sécurité de notre site.",
          },
        }}
        errors={errors}
      />
    </div>
  );
}

export default FormSecurity;
