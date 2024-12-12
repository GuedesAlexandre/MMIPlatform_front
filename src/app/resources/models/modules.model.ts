export interface Module {
  id: null;
  name: string;
  promo: string;
  semester: string;
  coeff: number;
  ueName: string;
  notes: null;
  sumNote: number;
}

export interface ModuleByEmailStore {
    moduleByEmail: Module[] | undefined;
    fetchModuleByEmail: (email: string) => void;
}