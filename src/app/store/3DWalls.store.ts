import { create } from "zustand";

interface store3DWall {
  showWalls: boolean;
  setShowWalls(showingWall: boolean): void;
}

export const WallStore = create<store3DWall>((set) => ({
  showWalls: true,
  setShowWalls: (showingWall: boolean) => {
    set({ showWalls: showingWall });
  },
}));