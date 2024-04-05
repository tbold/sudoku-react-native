import { CellResponse } from '@/types';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface CellProps {
  grid: CellResponse[][];
  cell: CellResponse;
  row: number;
  col: number;
  showHints: boolean;
  selectedCell: { row: number; col: number } | null;
  onCellChange: (row: number, col: number, value: number) => void;
  onCellSelect: (row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({
  grid,
  cell,
  row,
  col,
  showHints,
  selectedCell,
  onCellChange,
  onCellSelect,
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

      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;

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
  const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;

  const cellStyle = [
    styles.cell,
    cell.isMaster ? styles.masterCell : null,
    isSelected ? styles.selectedCell : null,
    isError ? styles.errorCell : null,
  ];

  const handleCellPress = () => {
    if (!cell.isMaster) {
      onCellSelect(row, col);
    }
  };

  return (
    <TouchableOpacity style={cellStyle} onPress={handleCellPress}>
      {cell.value ? (
        <Text style={styles.cellText}>{cell.value}</Text>
      ) : showCellHints ? (
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
      ) : null}
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get('window').width;
const containerPadding = 20;
const cellSize = Math.floor((screenWidth - containerPadding) / 9);

const styles = StyleSheet.create({
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  masterCell: {
    backgroundColor: 'lightgray',
  },
  selectedCell: {
    backgroundColor: 'yellow',
  },
  cellText: {
    fontSize: cellSize * 0.5,
    fontWeight: 'bold',
  },
  errorCell: {
    backgroundColor: 'red',
  },
  hintsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  hintsRow: {
    flexDirection: 'row',
  },
  hintText: {
    fontSize: cellSize * 0.2,
    color: 'gray',
    width: cellSize / 3,
    height: cellSize / 3,
    textAlign: 'center',
  },
});

export default Cell;