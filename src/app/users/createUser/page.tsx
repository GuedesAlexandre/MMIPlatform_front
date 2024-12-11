"use client";

import AccordionPersonalInfo from "@/app/users/createUser/components/accordionPersonalInfo";
import AccordionSecurity from "@/app/users/createUser/components/accordionSecurity";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import AccordionLessons from "@/app/users/createUser/components/accordionLessons";
import { getModuleStore } from "@/app/store/getAllModules";
import { User, Module } from "../models/user.model";
import { Permissions } from "@/app/auth/models/enums/PermissionsEnum";
import { useRouter } from "next/navigation";
import { DataModuleTableToDataAPIModule } from "@/app/utils/ModulesTableHelper";
import { ModuleCheckedStore } from "@/app/store/ModuleTableStore";
import { CreateUser } from "@/app/store/CreateUser.store";

function Page() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>();
  const { lessons } = ModuleCheckedStore();
  const { createUser } = CreateUser();
  const { all_module, fetchModule } = getModuleStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    const myData = data as User;
    if (!all_module) fetchModule();
    if (!all_module || !lessons) return;
    const moduleToCreateUser: Module[] = all_module
      ?.filter((module) =>
        lessons.find(
          (lesson) =>
            lesson.promo === module.promo &&
            lesson.resourceName === module.name &&
            lesson.semester === module.semester
        )
      )
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      );

    myData.modules = DataModuleTableToDataAPIModule(moduleToCreateUser);
    myData.access = Permissions.TEACHER;
    createUser(myData).then((user) => {
      setLoading(false);
      if (!user) return;
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/users/users-recap");
    });
  };
  return (
    <>
      <TitleHeaderUI label="Création d’un utilisateur" />
      <div className="sm:p-10 p-2">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <AccordionPersonalInfo
            register={register}
            errors={errors}
            trigger={trigger}
          />
          <AccordionSecurity
            register={register}
            errors={errors}
            trigger={trigger}
          />
          <AccordionLessons />
          <div className="justify-end flex mt-5">
            <Link href="/users">
              <ButtonsUI
                type="button"
                label="Retour"
                customClassName="!w-52 bg-danger text-white mr-5 hidden sm:block hover:bg-red-700 transition-colors duration-200"
              />
            </Link>
            {loading ? (
              <ButtonsUI
                type="submit"
                label="Enregistrement..."
                customClassName="!w-52 w-full"
                disbled={loading}
              />
            ) : (
              <ButtonsUI
                type="submit"
                label="Enregister"
                customClassName="sm:!w-52 w-full"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;
