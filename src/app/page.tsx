"use client";

import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import InputUI from "./components/ui/InputUI";

export default function Home() {
  return (
    <div>
      <InputUI
        type="text"
        name="mail"
        label="Addresse Mail"
        placeholder="Entrer votre Email"
        icon={<EnvelopeClosedIcon />}
      />
      <InputUI
        type="password"
        name="password"
        label="Mot de passe"
        placeholder="Entrer votre mot de passe"
        icon={<LockClosedIcon />}
      />
    </div>
  );
}
