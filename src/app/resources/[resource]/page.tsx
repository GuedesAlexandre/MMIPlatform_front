"use client";

import { UserModules } from "@/app/auth/models/User";
import { useParams, useSearchParams } from "next/navigation";
const Resource = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const data = searchParams.get("data");
  const parsedData: UserModules | null = data ? JSON.parse(data) : null;
  return (
    <div>
      <h1>Numéro reçu : {params.numero}</h1>
      <h2>Données complètes :</h2>
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
};
export default Resource;
