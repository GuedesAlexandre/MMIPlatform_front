export interface User {
  email: string;
  password: string;
  username: string;
  name: string;
  firstName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  establishment: string;
  access: string;
}

export interface storeUser {
  all_user: User | undefined;
  fetchUsers: () => Promise<void>;
}
