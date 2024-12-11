"use client";

import ButtonsUI from "@/app/components/ui/ButtonsUI";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { getModuleStore } from "@/app/store/getAllModules";
import { User, Module } from "../models/user.model";
import { Permissions } from "@/app/auth/models/enums/PermissionsEnum";
import { useRouter } from "next/navigation";
import {
  DataModuleTableToDataAPIModule,
  moduleDataTable,
} from "@/app/utils/ModulesTableHelper";
import { ModuleCheckedStore } from "@/app/store/ModuleTableStore";
import { CreateUser } from "@/app/store/CreateUser.store";
import Accordion from "@/app/components/accordion";
import FormPersonalInfo from "./components/formPersonalInfo";
import { PersonIcon, LockClosedIcon, GridIcon } from "@radix-ui/react-icons";
import FormSecurity from "./components/formSecurity";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";

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
  useEffect(() => {
    fetchModule();
  }, []);
  const allModuleToDataTable = moduleDataTable(all_module);

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
      router.push("/users");
    });
  };
  return (
    <>
      <TitleHeaderUI label="Création d’un utilisateur" />
      <div className="sm:p-10 p-2">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Accordion
            open={true}
            data={
              <FormPersonalInfo
                register={register}
                errors={errors}
                trigger={trigger}
              />
            }
            nom={"Informations personnelles"}
            icon={<PersonIcon />}
          />
          <Accordion
            open={true}
            data={
              <FormSecurity
                register={register}
                errors={errors}
                trigger={trigger}
              />
            }
            nom={"Sécurité"}
            icon={<LockClosedIcon />}
          />
          {allModuleToDataTable && (
            <Accordion
              open={true}
              data={<DataTable columns={columns} data={allModuleToDataTable} />}
              nom={"Ressources du professeur"}
              icon={<GridIcon />}
            />
          )}
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
