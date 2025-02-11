"use client";
import React, { useEffect, useState } from "react";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import { getModuleByEmailStore } from "@/app/store/getResourcesByEmail.store";
import { useStudentsByPromo } from "@/app/store/useStudentsByPromo.store";
import PromoCard from "@/app/internship/components/PromoCard";

const Internship = () => {
  const { user } = useAuthStore();
  const { moduleByEmail, fetchModuleByEmail } = getModuleByEmailStore();
  const [promoList, setPromoList] = useState<string[]>([]);
  const { studentsByPromo } = useStudentsByPromo();
  useEffect(() => {
    fetchModuleByEmail(String(user?.user.email));
  }, []);
  useEffect(() => {
    if (moduleByEmail) {
      const promoList = moduleByEmail.map((module) => module.promo);
      const uniquePromoList = [...new Set(promoList)];
      setPromoList(uniquePromoList);
    }
  }, [moduleByEmail]);


  return (
    <>
      <TitleHeaderUI label="Gestion des stages" />
      <div className="px-10">
        <div className="flex justify-center items-center">
          <h3>Sélectionnez une promotion</h3>
        </div>
      </div>
      <div className="flex justify-center gap-5 p-10">
        {promoList &&
          promoList.map((promo) => {
            return (
              <PromoCard
                key={promo}
                title={promo}
                number={studentsByPromo?.length}
                color="red"
              ></PromoCard>
            );
          })}
      </div>
    </>
  );
};

export default Internship;
