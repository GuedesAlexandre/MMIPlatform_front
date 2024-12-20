export interface storeMatrix {
  matrix: dataMatrix[] | undefined;
  setMatrixData: (data: dataMatrix[]) => void;
}

export interface dataMatrix {
  name: string;
  group: string;
  IdStudent: string;
  notes: Note;
  average: number;
}

type Note = Record<string, number>;
