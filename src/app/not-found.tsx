import { NotFoundImage } from "@/public/assets/svg";
import Link from "next/link";
// import NotFound from "@/public/"

export default function NotFound() {
  return (
    <div className="flex flex-row items-center justify-around mt-10">
      <NotFoundImage className="w-1/3" />
      <div className="w-1/3 flex flex-col items-start justify-around">
        <h2 className="font-tt-norms-black text-6xl my-5">Oh nooon ... </h2>
        <p className="mb-4 text-2xl">La page que vous essayer d’atteindre est introuvable.</p>
        <Link
          href="/"
          className="w-60 sm:w-72 rounded-[10px] py-[10px] px-9 font-tahoma text-center text-xl
          bg-primary-blue text-background-color hover:bg-primary-blue-hover transition-colors duration-200">
          Retourner à l&#39;accueil
        </Link>
      </div>
    </div>
  );
}
