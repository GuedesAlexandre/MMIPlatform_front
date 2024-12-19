import dynamic from "next/dynamic";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import SettingsModelViewer from "@/app/3Dpages/components/SettingsModelViewer";

export default function Pages() {
  const ModelViewer = dynamic(
    () => import("../3Dpages/components/ModelViewer"),
    { ssr: false }
  );
  return (
    <div className="h-screen flex flex-col justify-between">
      <TitleHeaderUI label="Plan de l'IUT Gustave Eiffel - Antenne de Meaux" />

      <main className="flex-grow">
        <ModelViewer />
      </main>

      <footer className="flex justify-center">
        <SettingsModelViewer />
      </footer>
    </div>
  );
}
