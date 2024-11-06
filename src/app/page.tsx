"use client";

import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import InputUI from "./components/ui/InputUI";
import { use, useEffect, useState } from "react";
import { useAuthStore } from "./store/AuthRepository";
import { User } from "./auth/models/User";

export default function Home() {
  const { user, fetchAuthToken } = useAuthStore();

  useEffect(() => {
    fetchAuthToken();
  }, []);

  console.log(user?.user);
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


