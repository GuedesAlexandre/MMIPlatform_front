import Link from "next/link";
import React from "react";

function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-2xl">
      <div className="text-left mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Retour à l'accueil
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Mentions Légales
      </h1>

      <section>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          1. Informations Générales
        </h2>
        <p className="text-gray-600">
          Le présent site est un site interne destiné à une université. Il n'est
          pas accessible au public et ne propose aucun service payant.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          2. Informations sur l’Hébergeur
        </h2>
        <p>
          <strong>Hostinger</strong>
        </p>
        <p className="text-gray-600">
          Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          3. Propriété Intellectuelle
        </h2>
        <p className="text-gray-600">
          L'ensemble des contenus présents sur ce site (textes, images, logo,
          etc.) est protégé par les lois en vigueur sur la propriété
          intellectuelle. Toute reproduction ou utilisation sans autorisation
          est interdite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          4. Données Personnelles
        </h2>
        <p className="text-gray-600">
          Dans le cadre de son fonctionnement, le site collecte et stocke les
          données personnelles suivantes des utilisateurs :
        </p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Nom</li>
          <li>Prénom</li>
          <li>Numéro étudiant</li>
          <li>Numéro de téléphone</li>
          <li>Adresse</li>
          <li>Email</li>
          <li>Mot de passe (crypté)</li>
        </ul>
        <p className="text-gray-600">
          Ces données sont uniquement utilisées pour les besoins internes de
          l'université et ne sont en aucun cas cédées à des tiers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          5. Cookies et Suivi
        </h2>
        <p className="text-gray-600">
          Le site peut utiliser des cookies pour améliorer l'expérience
          utilisateur. Ces cookies sont strictement nécessaires au bon
          fonctionnement du site et ne sont pas exploités à des fins
          publicitaires.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">6. Contact</h2>
        <p className="text-gray-600">
          Pour toute question concernant les mentions légales, vous pouvez nous
          contacter à l'adresse suivante :
        </p>
        <p className="text-gray-600 font-semibold">
          Numéro de téléphone : 06 43 50 67 04
        </p>
      </section>
    </div>
  );
}

export default LegalPage;
