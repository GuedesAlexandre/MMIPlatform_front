import { create } from "zustand";
import { dataMatrix, storeMatrix } from "@/app/matrix/models/matrixStore.model";

export const MatrixDataTable = create<storeMatrix>((set) => ({
  matrix: undefined,
  setMatrixData: (data: dataMatrix[]) => set({ matrix: data }),
}));
