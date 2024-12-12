import { ModuleTable } from "@/app/users/createUser/components/data-table/columns";
import { Module } from "@/app/users/models/user.model";

export function moduleDataTable(
  modules: Module[] | undefined
): ModuleTable[] | undefined {
  if (!modules) return;
  const modulesFiltered = modules
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.name === value.name && t.promo === value.promo)
    )
    .sort(
      (a, b) =>
        a.semester.localeCompare(b.semester) || a.name.localeCompare(b.name)
    );

  return modulesFiltered.map((module) => {
    return {
      id: module.name + "." + module.semester,
      promo: module.promo,
      semester: module.semester,
      resourceName: module.name,
    };
  });
}

export function DataModuleTableToDataAPIModule(
  modules: Module[] | undefined
): Module[] {
  if (!modules) return [];
  return modules.map((module) => ({
    name: module.name,
    promo: module.promo,
    semester: module.semester,
    coeff: module.coeff,
    sum: 0,
    ueName: module.ueName,
    notes: [],
  }));
}
