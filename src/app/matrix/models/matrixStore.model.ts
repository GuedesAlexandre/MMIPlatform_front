export interface storeMatrix {
  matrix: dataMatrix[] | undefined;
  setMatrixData: (data: dataMatrix[]) => void;
}

export interface dataMatrix {
  name: string;
  group: string;
  IdStudent: number;
  notes: Note[];
  average: number;
  results: any;
}

interface Note {
  name: string;
  average: number;
}
