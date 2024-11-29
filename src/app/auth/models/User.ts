import { Permissions } from "./enums/PermissionsEnum";
export interface User {
  user: {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    establishment: string;
    firstName: string;
    access: Permissions;
    moduleDaos: UserModules[];
  };
  exp: number;
  iat: number;
  sub: string;
}

export interface UserModules {
  id: string;
  coeff: number;
  name: string;
  ueName: string;
  semester: string;
  promo: string;
  sumNote: number;
  notes: NoteDao[];
}

export interface NoteDao {
  coeff: number;
  name: string;
  note: number;
}

export interface storeUsers {
  user: User | undefined;
  fetchAuthToken: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
  removeUserSession: () => void;
}
