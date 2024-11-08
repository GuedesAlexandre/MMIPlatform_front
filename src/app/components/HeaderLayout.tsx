import React from "react";
import { MMI_Image } from "@/public/assets/svg";

function HeaderLayout() {
  return (
    <header className="bg-primary-blue h-24 flex justify-center align-middle content-center">
      <MMI_Image className="h-3/4 my-auto" />
    </header>
  );
}

export default HeaderLayout;
