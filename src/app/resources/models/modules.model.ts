export interface Module {
  name: string;
  promo: string;
  semester: string;
  coeff: number;
  ueName: string;
  sumNote: number;
}

export interface ModuleByEmailStore {
    moduleByEmail: Module[] | undefined;
    fetchModuleByEmail: (email: string) => void;
}