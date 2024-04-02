import { CellResponse } from '@/types';
import React, { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CellProps {
  grid: CellResponse[][];
  cell: CellResponse;
  row: number;
  col: number;
  showHints: boolean;
  onCellChange: (row: number, col: number, value: number) => void;
}
const Cell: React.FC<CellProps> = ({
  grid,
  cell,
  row,
  col,
  showHints,
  onCellChange
}) => {

  const isConflicting = useMemo(() => {
    return (value: number) => {
      if (!value) return false;

      const rowConflict = grid[row].some(
        (cell, c) => c !== col && cell.value === value
      );

      if (rowConflict) return true;

      const colConflict = grid.some(
        (rowItem, r) => r !== row && rowItem[col].value === value
      );

      if (colConflict) return true;

      const boxRow = Math.floor((row) / 3) * 3;
      const boxCol = Math.floor((col) / 3) * 3;

      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if (i === row && j === col) continue;
          if (grid[i][j].value === value) {
            return true;
          }
        }
      }

      return false;
    };
  }, [grid, row, col, cell.value]);

  const getHints = (): number[] => {
    const hints: number[] = [];
    for (let value = 1; value <= 9; value++) {
      if (!isConflicting(value)) {
        hints.push(value);
      }
    }
    return hints;
  };
  const showCellHints = showHints && !cell.value;

  const hints = getHints();
  const isError = !cell.isMaster && cell.value && isConflicting(cell.value);

  const cellInputStyle = [
    styles.cellInput,
    isError ? styles.errorText : null,
  ];

  return (
    cell.isMaster ?
      <Text style={styles.cellText}>{cell.value}</Text>
      : (
        <View style={styles.cellInputContainer}>
          <TextInput
            style={cellInputStyle}
            keyboardType="numeric"
            maxLength={1}
            value={cell.value ? cell.value.toString() : ''}
            onChangeText={(value) => onCellChange(row, col, Number(value))}
          />
          {showCellHints && (
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
          )}
        </View>
      )
  );
};

const styles = StyleSheet.create({
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cellInput: {
    width: 60,
    height: 60,
    fontSize: 24,
    textAlign: 'center',
  },
  errorCell: {
    backgroundColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  cellInputContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintsContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    zIndex: -1,
  },
  hintsRow: {
    flexDirection: 'row',
  },
  hintText: {
    fontSize: 12,
    color: 'gray',
    width: 16,
    height: 16,
    textAlign: 'center',
  },

});

export default Cell;