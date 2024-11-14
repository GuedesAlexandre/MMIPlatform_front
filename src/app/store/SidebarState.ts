import { create } from "zustand";
import { SidebarState } from "../models/ui/sidebarState.model";

export const useSidebarState = create<SidebarState>((set) => ({
  isOpen: false,
  setIsOpen: (toggleOpen) => set({ isOpen: toggleOpen }),
}));
