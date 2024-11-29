import { Permissions } from "../auth/models/enums/PermissionsEnum";

export function translateAccess(access: string) {
  switch (access) {
    case Permissions.ADMIN:
      return "Admin";
    case Permissions.SCOLARITY:
      return "Scolarité";
    case Permissions.TEACHER:
      return "Professeur";
    case Permissions.SUPPORT:
      return "Support";
    default:
      return "Non renseigné";
  }
}
