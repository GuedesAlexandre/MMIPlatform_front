export interface storeUsers {
  all_user: User[] | undefined;
  fetchUsers: () => Promise<void>;
}
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
  modules: Module[];
}

export interface Module {
  name: string;
  promo: string;
  semester: string;
  coeff: number;
  ueName: string;
  notes: number[];
  sum: number;
}
