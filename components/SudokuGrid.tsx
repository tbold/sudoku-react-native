import { CellResponse } from '@/types';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface SudokuGridProps {
  grid: CellResponse[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, onCellChange }) => {
  const isConflicting = (row: number, col: number, value: number): boolean => {
    const rowConflict = grid[row].some(
      (cell) => cell.value === value
    );
    const colConflict = grid.some(
      (r) => r[col].value === value
    );
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    const boxConflict = grid
      .slice(boxRow, boxRow + 3)
      .some((r) =>
        r.slice(boxCol, boxCol + 3).some((cell) => cell.value === value)
      );
    return rowConflict || colConflict || boxConflict;
  };

  const getHints = (row: number, col: number): number[] => {
    const hints: number[] = [];
    for (let value = 1; value <= 9; value++) {
      if (!isConflicting(row, col, value)) {
        hints.push(value);
      }
    }
    return hints;
  };

  const renderCell = (cell: CellResponse, row: number, col: number) => {
    if (cell.isMaster) {
      return <Text style={styles.cellText}>{cell.value}</Text>;
    } else {
      const hints = getHints(row, col);
      return (
        <View style={styles.cellInputContainer}>
          <TextInput
            style={styles.cellInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(value) => onCellChange(row, col, Number(value))}
          />
          <View style={styles.hintsContainer}>
            {[...Array(3)].map((_, rowIndex) => (
              <View key={rowIndex} style={styles.hintsRow}>
                {[...Array(3)].map((_, colIndex) => {
                  const hintValue = rowIndex * 3 + colIndex + 1;
                  const isHint = hints.includes(hintValue);
                  return (
                    <Text key={colIndex} style={styles.hintText}>
                      {isHint ? hintValue : ' '}
                    </Text>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.gridContainer}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => {
            const isError = !cell.isMaster && cell.value && isConflicting(rowIndex, cellIndex, cell.value);
            const cellStyle = [
              (rowIndex + 1) % 3 === 0 && styles.bottomBorder,
              (cellIndex + 1) % 3 === 0 && styles.rightBorder,
              isError ? styles.errorCell : styles.cell,
            ];

            return (
              <View key={cellIndex} style={cellStyle}>
                {renderCell(cell, rowIndex, cellIndex)}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  rightBorder: {
    borderRightWidth: 2,
    borderRightColor: 'black',
  },
  cellText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cellInput: {
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
  },
  errorCell: {
    backgroundColor: 'red',
  },
  errorText: {
    color: 'white',
  },
  cellInputContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintsContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    zIndex: -1,
  },
  hintsRow: {
    flexDirection: 'row',
  },
  hintText: {
    fontSize: 10,
    color: 'gray',
    width: 13,
    height: 13,
    textAlign: 'center',
  },
});

export default SudokuGrid;