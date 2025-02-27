export interface UserSessionJWT {
  user: UserJWTtoModel;
  sub: string;
  iat: number;
  exp: number;
  expirationTime?: number;
}

interface UserJWTtoModel {
  firstName: string;
  access: string;
  name: string;
  email: string;
  username: string;
}

export interface storeUsers {
  user: UserSessionJWT | undefined;
  fetchAuthToken: (
    email: string,
    password: string
  ) => Promise<UserSessionJWT | { error: string } | undefined>;
  removeUserSession: () => void;
  checkSessionExpiration: () => void;
}
