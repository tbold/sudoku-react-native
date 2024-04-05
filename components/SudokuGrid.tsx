import { CellResponse } from '@/types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Cell from '@/components/Cell';

interface SudokuGridProps {
  grid: CellResponse[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, onCellChange }) => {
  const [showHints, setShowHints] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
  const handleCellSelect = (row: number, col: number) => {
    if (selectedCell?.row == row && selectedCell.col) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row, col });
    }
  };

  return (
    <View>
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => {
              const cellStyle = [
                (rowIndex + 1) % 3 === 0 && styles.bottomBorder,
                (cellIndex + 1) % 3 === 0 && styles.rightBorder,
              ];
              return (
                <View key={cellIndex} style={cellStyle}>
                  <Cell
                    grid={grid}
                    cell={cell}
                    row={rowIndex}
                    col={cellIndex}
                    showHints={showHints}
                    onCellChange={onCellChange}
                    onCellSelect={handleCellSelect}
                    selectedCell={selectedCell}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowHints(!showHints)}
      >
        <Text style={styles.buttonText}>
          {showHints ? 'Hide Hints' : 'Show Hints'}
        </Text>
      </TouchableOpacity>
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
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  rightBorder: {
    borderRightWidth: 2,
    borderRightColor: 'black',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SudokuGrid;