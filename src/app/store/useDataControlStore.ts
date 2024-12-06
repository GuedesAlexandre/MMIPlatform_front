import { create } from "zustand";

interface DataStore {
  notes: { numEtu: string; note: number }[];
  controlName: string;
  coefficient: number;
  resource: string | null;
  setNotes: (notes: { numEtu: string; note: number }[]) => void;
  setControlName: (name: string) => void;
  setCoefficient: (coefficient: number) => void;
  setResource: (resource: string | null) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  notes: [],
  controlName: "",
  coefficient: 1,
  resource: null,
  setNotes: (notes) => set({ notes }),
  setControlName: (name) => set({ controlName: name }),
  setCoefficient: (coefficient) => set({ coefficient }),
  setResource: (resource) => set({ resource }),
}));
