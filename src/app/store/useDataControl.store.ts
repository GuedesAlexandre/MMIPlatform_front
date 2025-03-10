import { create } from "zustand";

interface DataStore {
  notes: { numEtu: string; note: number }[];
  statut: { numEtu: string; status: string }[];
  controlName: string;
  coefficient: number | null;
  resource: string | null;
  method: "PUT" | "POST";
  lastName: string | null;
  controlsNameList: string[];
  setControlsNameList: (controlsNameList: string[]) => void;
  setLastName: (lastName: string | null) => void;
  setMethod: (method: "PUT" | "POST") => void;
  setStatut: (statut: { numEtu: string; status: string }[]) => void;
  setNotes: (notes: { numEtu: string; note: number }[]) => void;
  setControlName: (name: string) => void;
  setCoefficient: (coefficient: number | null) => void;
  setResource: (resource: string | null) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  notes: [],
  statut: [],
  controlName: "",
  coefficient: null,
  resource: null,
  method: "POST",
  lastName: null,
  controlsNameList: [],
  setControlsNameList: (controlsNameList) => set({ controlsNameList }),
  setLastName: (lastName) => set({ lastName }),
  setMethod: (method) => set({ method }),
  setStatut: (statut) => set({ statut }),
  setNotes: (notes) => set({ notes }),
  setControlName: (name) => set({ controlName: name }),
  setCoefficient: (coefficient) => set({ coefficient }),
  setResource: (resource) => set({ resource }),
}));
