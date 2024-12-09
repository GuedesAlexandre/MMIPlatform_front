import { create } from "zustand";
import { ModuleTable } from "../users/createUser/components/data-table/columns";

interface storeModule {
  lessons: ModuleTable[] | undefined;
  setLessons(lessons: ModuleTable[]): void;
}

export const ModuleCheckedStore = create<storeModule>((set) => ({
  lessons: undefined,
  setLessons: (lessons: ModuleTable[]) => set({ lessons: lessons }),
}));
