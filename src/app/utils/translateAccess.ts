import { PermissionsEnum } from "@/app/models/enums/PermissionsEnum";

export function translateAccess(access: string) {
  switch (access) {
    case PermissionsEnum.ADMIN:
      return "Référent";
    case PermissionsEnum.SCOLARITY:
      return "Scolarité";
    case PermissionsEnum.TEACHER:
      return "Professeur";
    case PermissionsEnum.SUPPORT:
      return "Support";
    default:
      return "Non renseigné";
  }
}
