export interface UserSessionJWT {
  user: UserJWTtoModel;
  sub: string;
  iat: number;
  exp: number;
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
  ) => Promise<UserSessionJWT | undefined>;
  removeUserSession: () => void;
}
