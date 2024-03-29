interface ApiResponse {
  newboard: {
    grids: Array<{
      value: number[][];
      solution: number[][];
      difficulty: string;
    }>;
    results: number;
    message: string;
  };
}

export { ApiResponse };