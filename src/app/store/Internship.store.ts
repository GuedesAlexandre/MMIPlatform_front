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
    const bearer = Cookies.get("bearer");
    const response = await axios.get<InternshipStudent[]>(
      `${process.env.NEXT_PUBLIC_API_PATH}/internship/${promo}`,
      {
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
      }
    );
    set({ internships: response.data });
  },

  addInternship: async (numEtu: string, internship: Internship) => {
    const bearer = Cookies.get("bearer");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/internship/${numEtu}`,
      internship,
      {
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
      }
    );
    set((state) => ({ internships: [...state.internships, response.data] }));
  },

  deleteInternship: async (numEtu: string, years: number, title: string) => {
    const bearer = Cookies.get("bearer");
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/internship/${numEtu}/${years}/${title}`,
      {
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
      }
    );
    set((state) => ({
      internships: state.internships.map((intern) =>
        intern.numEtu === numEtu
          ? {
              ...intern,
              internships: intern.internships.filter(
                (int) => int.years !== years || int.title !== title
              ),
            }
          : intern
      ),
    }));
  },

  updateInternship: async (
    numEtu: string,
    years: number,
    title: string,
    internship: Internship
  ) => {
    const bearer = Cookies.get("bearer");
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/v1/internship/${numEtu}/${years}/${title}`,
      internship,
      {
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
      }
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
