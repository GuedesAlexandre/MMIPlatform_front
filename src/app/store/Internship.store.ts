import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

import { Internship, InternshipStudent } from "@/app/models/Internship";

interface InternshipState {
  internships: InternshipStudent[];
  fetchInternships: (promo: string) => Promise<void>;
  addInternship: (numEtu: string, internship: Internship) => Promise<void>;
  deleteInternship: (
    numEtu: string,
    years: number,
    title: string
  ) => Promise<void>;
  updateInternship: (
    numEtu: string,
    years: number,
    title: string,
    internship: Internship
  ) => Promise<void>;
}

export const useInternshipStore = create<InternshipState>((set) => ({
  internships: [],
  fetchInternships: async (promo: string) => {
    const response = await axios.get(`/api/v1/internship/${promo}`);
    set({ internships: response.data });
  },

  addInternship: async (numEtu: string, internship: Internship) => {
    const response = await axios.post(
      `/api/v1/internship/${numEtu}`,
      internship
    );
    set((state) => ({ internships: [...state.internships, response.data] }));
  },

  deleteInternship: async (numEtu: string, years: number, title: string) => {
    await axios.delete(`/api/v1/internship/${numEtu}/${years}/${title}`);
    set((state) => ({
      internships: state.internships.filter((internship) =>
        internship.internships.some(
          (intern) =>
            internship.numEtu !== numEtu ||
            intern.years !== years ||
            intern.title !== title
        )
      ),
    }));
  },
  updateInternship: async (
    numEtu: string,
    years: number,
    title: string,
    internship: Internship
  ) => {
    const response = await axios.put(
      `/api/v1/internship/${numEtu}/${years}/${title}`,
      internship
    );
    set((state) => ({
      internships: state.internships.map((intern) =>
        intern.numEtu === numEtu
          ? {
              ...intern,
              internships: intern.internships.map((int) =>
                int.years === years && int.title === title
                  ? { ...int, ...response.data }
                  : int
              ),
            }
          : intern
      ),
    }));
  },
}));
