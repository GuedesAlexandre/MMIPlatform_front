import { Module } from "@/app/resources/models/modules.model";

const getPromoUniqueInModule = (modules: Module[]) => {
  const promo = modules.map((module) => module.promo);
  return [...new Set(promo)].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
};

export const promoToSelectArray = (modules: Module[]) => {
  const promo = getPromoUniqueInModule(modules);
  return promo.map((promo) => ({ label: promo, value: promo }));
};
