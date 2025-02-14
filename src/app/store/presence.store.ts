import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  SignatureSheet,
  SignatureStudentData,
} from "../presence/models/signature.model";
import { Student } from "@/app/matrix/models/students.model";
import axios, { AxiosError } from "axios";

interface StoreStudentsSignature {
  studentsSignatures: SignatureSheet | undefined;
  setStudentAndSetingsWithoutStudentSignature: (
    students: Student[],
    promo: string,
    cours: string,
    createAT: Date,
    finiAt: Date
  ) => Promise<void>;
  createSheetStudent: (
    students: Student[],
    promo: string,
    cours: string,
    createAT: Date,
    finiAt: Date,
    studentsSignature: SignatureStudentData[]
  ) => Promise<void>;
  getStudentsSignatures: () => SignatureSheet | undefined;
  resetStudentsSignatures: () => void;
}

export const useStudentsSignatureStore = create(
  persist<StoreStudentsSignature>(
    (set, get) => ({
      studentsSignatures: undefined,

      getStudentsSignatures: () => get().studentsSignatures,

      setStudentAndSetingsWithoutStudentSignature: async (
        students: Student[],
        promo: string,
        cours: string,
        createAT: Date,
        finiAt: Date
      ) => {
        set({
          studentsSignatures: {
            promo,
            moduleName: cours,
            createdAt: createAT,
            finishAt: finiAt,
            students: students,
          },
        });
      },

      createSheetStudent: async (
        students: Student[],
        promo: string,
        cours: string,
        createAT: Date,
        finiAt: Date,
        studentsSignature: SignatureStudentData[]
      ) => {
        try {
          const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

          const signatureSheet: SignatureSheet = {
            promo,
            moduleName: cours,
            createdAt: createAT,
            finishAt: finiAt,
            students: students,
            signatures: studentsSignature,
          };

          await axios.post<SignatureSheet>(
            `${API_PATH}/sheets`,
            signatureSheet
          );
          set({ studentsSignatures: undefined });
        } catch (err: unknown) {
          const error = err as AxiosError;
          console.error(
            "Erreur lors de la création de la feuille de signature :",
            error
          );
        }
      },
      resetStudentsSignatures: () => set({ studentsSignatures: undefined }),
    }),
    {
      name: "presence-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
