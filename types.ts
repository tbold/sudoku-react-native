interface ApiResponse {
  newboard: {
    grids: Array<{
      value: CellResponse[][];
      solution: number[][];
      difficulty: string;
    }>;
    results: number;
    message: string;
  };
}

interface CellResponse {
  value?: number;
  isMaster: boolean;
}

export { ApiResponse, CellResponse };