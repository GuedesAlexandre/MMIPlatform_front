import { Module, User } from "@/app/users/models/user.model";

export interface storeModule {
  all_module: Module[] | undefined;
  fetchModule: () => Promise<void>;
}

export interface CreateUserStore {
  user: User | undefined;
  createUser: (user: User) => Promise<User | undefined>;
}
