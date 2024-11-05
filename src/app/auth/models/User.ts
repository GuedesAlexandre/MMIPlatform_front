import { Permissions } from "./enums/PermissionsEnum";

export interface User {
  user: {
    id: string;
    email: string;
    password: string;
    userName: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    establishment: string;
    access: Permissions;
  };
  exp: number;
  iat: number;
  sub: string;
}

export interface storeUser {
  user: User | undefined;
  //todo delete "?" went back have Authentification
  fetchAuthToken: (email?: string, password?: string) => void;
}
