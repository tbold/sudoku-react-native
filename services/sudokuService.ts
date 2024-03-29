import { ApiResponse } from "@/types";

const API_ENDPOINT = 'https://sudoku-api.vercel.app/api/dosuku';

export const fetchSudokuGrid = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Sudoku grid:', error);
    throw error;
  }
};