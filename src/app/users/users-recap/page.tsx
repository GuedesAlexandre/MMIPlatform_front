"use client";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import TabsRecap from "./components/TabsRecap";
import { User } from "../models/user.model";
import ButtonsUI from "@/app/components/ui/ButtonsUI";
import { useRouter } from "next/navigation";

const page = () => {
  const userString = localStorage.getItem("user");
  let user: User | undefined = undefined;
  const router = useRouter();

  if (userString) {
    try {
      user = JSON.parse(userString) as User;
    } catch (error) {
      console.error("Erreur lors de la conversion de l'utilisateur :", error);
    }
  }

  return (
    <>
      <TitleHeaderUI label="Création d’un utilisateur - Récapitulatif" />
      <TabsRecap user={user} />

      <div
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/users");
        }}
      >
        <ButtonsUI
          label="Terminer"
          type="button"
          customClassName="bg-primary-blue text-white !w-auto px-5 mb-5 ml-auto flex mr-[8.6666%]"
        />
      </div>
    </>
  );
};

export default page;
