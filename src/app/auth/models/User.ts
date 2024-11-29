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
  };
  exp: number;
  iat: number;
  sub: string;
}

export interface storeUsers {
  user: User | undefined;
  fetchAuthToken: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
  removeUserSession: () => void;
}
