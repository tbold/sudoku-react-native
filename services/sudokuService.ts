import { ApiResponse, CellResponse } from "@/types";

const API_ENDPOINT = 'https://sudoku-api.vercel.app/api/dosuku';

const mapGridResponse = (body: any): ApiResponse => {
  const grid = body.newboard.grids[0].value;
  const mappedGrid = grid.map((row: number[]) =>
    row.map((cell: number) => {
      const newCell: CellResponse = {
        value: cell,
        isMaster: cell !== 0,
      };
      return newCell;
    })
  );
  body.newboard.grids[0].value = mappedGrid;
  return body as ApiResponse;
}

export const fetchSudokuGrid = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return mapGridResponse(data);
  } catch (error) {
    console.error('Error fetching Sudoku grid:', error);
    throw error;
  }
};