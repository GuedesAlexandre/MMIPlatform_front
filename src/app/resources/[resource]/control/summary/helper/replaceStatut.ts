export const replaceStatut = (statut: string | undefined) => {
    switch (statut) {
      case "ABS":
        return "Absent";
      case "DEF":
        return "Défaillant";
      case "DONE":
        return "Valide";
      case "MAKEUP":
        return "Rattrapage";
      default:
        return statut;
    }
  };