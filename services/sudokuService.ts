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
    // const response = await fetch(API_ENDPOINT);
    // const data = await response.json();
    return mapGridResponse({
      "newboard": {
        "grids": [
          {
            "value": [
              [
                0,
                4,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              [
                0,
                0,
                0,
                0,
                3,
                0,
                6,
                7,
                1
              ],
              [
                0,
                0,
                0,
                1,
                0,
                8,
                0,
                2,
                0
              ],
              [
                1,
                0,
                0,
                0,
                0,
                0,
                4,
                0,
                0
              ],
              [
                0,
                2,
                0,
                8,
                0,
                0,
                0,
                0,
                0
              ],
              [
                0,
                9,
                0,
                0,
                4,
                0,
                0,
                1,
                0
              ],
              [
                7,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                8
              ],
              [
                0,
                3,
                8,
                0,
                0,
                0,
                1,
                0,
                7
              ],
              [
                5,
                0,
                0,
                0,
                8,
                4,
                0,
                0,
                9
              ]
            ],
            "solution": [
              [
                2,
                4,
                1,
                6,
                7,
                9,
                5,
                8,
                3
              ],
              [
                8,
                5,
                9,
                4,
                3,
                2,
                6,
                7,
                1
              ],
              [
                3,
                7,
                6,
                1,
                5,
                8,
                9,
                2,
                4
              ],
              [
                1,
                8,
                5,
                2,
                9,
                7,
                4,
                3,
                6
              ],
              [
                4,
                2,
                3,
                8,
                6,
                1,
                7,
                9,
                5
              ],
              [
                6,
                9,
                7,
                3,
                4,
                5,
                8,
                1,
                2
              ],
              [
                7,
                6,
                4,
                9,
                1,
                3,
                2,
                5,
                8
              ],
              [
                9,
                3,
                8,
                5,
                2,
                6,
                1,
                4,
                7
              ],
              [
                5,
                1,
                2,
                7,
                8,
                4,
                3,
                6,
                9
              ]
            ],
            "difficulty": "Medium"
          }
        ],
        "results": 1,
        "message": "All Ok"
      }
    });
  } catch (error) {
    console.error('Error fetching Sudoku grid:', error);
    throw error;
  }
};