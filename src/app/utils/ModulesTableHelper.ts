import { ModuleTable } from "../users/createUser/components/data-table/columns";
import { Module } from "../users/createUser/components/data-table/models/data-table.model";

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
      promo: module.promo,
      semester: module.semester,
      resourceName: module.name,
    };
  });
}

export function DataModuleTableToDataAPIModule(modules: Module[] | undefined) {
  if (!modules) return;
  return modules.map((module) => ({
    name: module.name,
    promo: module.promo,
    semester: module.semester,
    coeff: module.coeff,
    ueName: module.ueName,
    sumNote: module.sumNote,
    sum: 0,
    note: [],
  }));
}
