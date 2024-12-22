# MMIPlatform : Gestion Académique et Administrative

## Introduction

L'université de Meaux ne dispose actuellement d'aucune application pour gérer efficacement les notes, les justificatifs d'absence et la disponibilité des salles. En réponse à ce besoin, le projet **MMI Platform** a été initié par notre équipe d'étudiants en MMI 3ème année.

Cette application vise à centraliser et simplifier la gestion académique et administrative grâce à des outils modernes, notamment :
- Une vue interactive 3D des salles,
- Une gestion avancée des matrices Excel liés à une gestion des notes pour vos étudiants.

---

## Tutoriel : Installation et utilisation de l'application Next.js

### Pré-requis
1. **Node.js** : Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version LTS recommandée).
2. **npm** : Inclus avec Node.js pour gérer les dépendances.

---

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-repository/mmiplatform.git
   cd mmiplatform
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**

   À la racine du projet, créez un fichier nommé **`.env.local`** :
   ```bash
   touch .env.local
   ```

   Ajoutez-y les variables d'environnement suivantes :  
   ```env
   NEXT_PUBLIC_API_PATH=http://localhost:8080/mmiplatform/api/v1
   NEXT_PUBLIC_SECRET_KEY=f1sQXsbE07j7qvWXayFN0p80hMnkeL7RvnRO+GnjclJzFkXao+S722PQHZTXhLoqMQEV+1VZnYIbeSHGFl1CStG5+h74Rbp9hoOYGi8kLj8nwbM3+9ZApWbFyc4SV2c76WkYFE/8MBvplUFFVIgM/PDp37VwA89RfDIoVYZDxbQ7oIlrNCT0he+OLf8tR8M7VIO4G/uk1hgRH821caLJaHZXZnx6TGgtjjloXnqfShvVrCpx8/qRuPJ5LlYOlVRoy0/RYr0gThhWoUbyxaVRNVK8gJugwtufSb2+Wgo1umQi2aMO0otkSBkJnqIpoJ9vqbUD37ka6yofSZ/SA7QUNg==
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Par défaut, l'application sera accessible sur [http://localhost:3000](http://localhost:3000).

---

### Résolution des problèmes

- **Erreur : "Module not found"**
  Assurez-vous d'avoir exécuté `npm install` pour installer toutes les dépendances.

- **Port occupé**
  Si le port 3000 est déjà utilisé, vous pouvez démarrer le serveur sur un autre port avec la commande :
  ```bash
  PORT=4000 npm run dev
  ```

---

## Ressources supplémentaires

- [Documentation officielle Next.js](https://nextjs.org/docs)
- [Node.js](https://nodejs.org/)
- [MMI Platform GitHub](https://github.com/votre-repository/mmiplatform)
