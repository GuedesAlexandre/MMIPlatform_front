import { useState } from "react";
import InputUI from "@/app/components/ui/InputUI";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import { FieldValues, useForm } from "react-hook-form";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import LoaderUi from "@/app/components/ui/LoaderUi";
import Link from "next/link";

interface FormData {
  password: string;
  mail: string;
}
function ConnectionForm() {
  const { fetchAuthToken } = useAuthStore();
  const { register, handleSubmit } = useForm<FieldValues>();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const onSubmit = (data: FieldValues) => {
    setLoader(true);
    const myData = data as FormData;
    fetchAuthToken(myData.mail, myData.password).then((response) => {
      setLoader(false);
      if (!response) {
        setError(true);
        return;
      }
      if (response) return;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-fit py-6 px-8 xs:px-12 xs:py-10 border-primary-blue border rounded-[30px] flex flex-col gap-5 mx-auto mt-40">
          {error && (
            <div className="text-sm text-center text-danger">
              Une erreur s&apos;est produite lors de la connexion.
            </div>
          )}
          <InputUI
            type="text"
            name="mail"
            label="Email"
            placeholder="Entrer votre Email"
            icon={<EnvelopeClosedIcon />}
            register={register}
            rules={{ required: true }}
            haveError={error}
          />
          <InputUI
            type="password"
            name="password"
            label="Mot de passe"
            placeholder="Entrer votre mot de passe"
            icon={<LockClosedIcon />}
            register={register}
            rules={{ required: true }}
            haveError={error}
          />
          {loader ? (
            <ButtonsUI
              type="submit"
              icon={<LoaderUi sizeCustome="size-[20px]" />}
              disbled={true}
            />
          ) : (
            <ButtonsUI type="submit" label="Connexion" />
          )}
        </div>
      </form>

      <Link
        className="absolute bottom-4 left-4 text-placeholder-color cursor-pointer"
        href="/legalNotice"
      >
        Mentions Légales
      </Link>
    </>
  );
}

export default ConnectionForm;
