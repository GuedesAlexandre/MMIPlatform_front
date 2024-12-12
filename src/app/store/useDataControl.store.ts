import { create } from "zustand";

interface DataStore {
  notes: { numEtu: string; note: number; }[];
  statut: { numEtu: string; status: string }[];
  controlName: string;
  coefficient: number;
  resource: string | null;
  setStatut: (statut: { numEtu: string; status: string }[]) => void;
  setNotes: (notes: { numEtu: string; note: number }[]) => void;
  setControlName: (name: string) => void;
  setCoefficient: (coefficient: number) => void;
  setResource: (resource: string | null) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  notes: [],
  statut: [],
  controlName: "",
  coefficient: 1,
  resource: null,
  setStatut: (statut) => set({ statut }),
  setNotes: (notes) => set({ notes }),
  setControlName: (name) => set({ controlName: name }),
  setCoefficient: (coefficient) => set({ coefficient }),
  setResource: (resource) => set({ resource }),
}));