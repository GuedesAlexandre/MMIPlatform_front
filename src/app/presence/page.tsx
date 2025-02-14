"use client";

import React, { useEffect, useState } from "react";
import TitleHeaderUI from "../components/ui/TitleHeaderUI";
import Accordion from "../components/accordion";
import { PaddingIcon } from "@radix-ui/react-icons";
import { FieldValues, useForm } from "react-hook-form";
import GenerateQrCode from "./components/GenerateQrCode";
import SelectUI from "../components/ui/SelectUI";
import { useAuthStore } from "../store/AuthRepository.store";
import { getModuleByEmailStore } from "../store/getResourcesByEmail.store";
import { promoToSelectArray } from "./helper/getPromoInModule";

function Page() {
  const [promoToUser, setPromoToUser] = useState<
    { label: string; value: string }[]
  >([]);
  const { user } = useAuthStore();
  const { moduleByEmail, fetchModuleByEmail } = getModuleByEmailStore();

  useEffect(() => {
    fetchModuleByEmail(String(user?.user.email));
  }, []);

  useEffect(() => {
    if (!moduleByEmail) return;
    setPromoToUser(promoToSelectArray(moduleByEmail));
    console.log("promoToUser", promoToUser);
  }, [moduleByEmail]);

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>();
  return (
    <>
      <TitleHeaderUI label="Présence des étudiants" />
      <form autoComplete="off">
        <div className="border border-placeholder-color rounded m-6 p-3">
          <div className="w-36 ">
            <SelectUI
              name="promo"
              label="Promotion"
              placeholder="MMI1/MMI2/MMI3"
              register={register}
              rules={{
                required: "Veuillez remplir ce champ.",
              }}
              options={promoToUser}
            />
          </div>
        </div>
        <div className="sm:p-10 p-2">
          <Accordion
            open={false}
            data={
              <GenerateQrCode
                register={register}
                errors={errors}
                trigger={trigger}
              />
            }
            name={"QR Code de présence"}
            icon={<PaddingIcon />}
          />
        </div>
      </form>
    </>
  );
}

export default Page;
