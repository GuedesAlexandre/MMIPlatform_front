"use client";
import { WallStore } from "@/app/store/3DWalls.store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function SettingsModelViewer() {
  const [isClicked, setIsClicked] = useState(true);
  const { showWalls, setShowWalls } = WallStore();
  return (
    <div className="w-full">
      <div
        className="w-fit mx-auto bg-primary-blue rounded-t py-1 px-20 text-white"
        onClick={() => setIsClicked(!isClicked)}
      >
        {isClicked ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div
        className={`w-3/5 bg-primary-blue rounded m-auto text-white h-fit transition-all duration-300 ease-in-out ${
          isClicked ? "max-h-0 opacity-0 py-0" : "max-h-screen opacity-100 py-4"
        }`}
        style={{ overflow: "hidden" }}
      >
        <label className="flex items-center space-x-2 justify-center">
          <input
            type="checkbox"
            checked={showWalls}
            onChange={(e) => setShowWalls(e.target.checked)}
          />
          <span>Afficher les murs</span>
        </label>
      </div>
    </div>
  );
}

export default SettingsModelViewer;