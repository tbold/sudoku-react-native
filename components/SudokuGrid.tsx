import { CellResponse } from '@/types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Cell from '@/components/Cell';

interface SudokuGridProps {
  grid: CellResponse[][];
  onCellChange: (row: number, col: number, value?: number) => void;
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

  const handleNumberPress = (value: number) => {
    if (selectedCell) {
      onCellChange(selectedCell.row, selectedCell.col, value);
    }
  };

  const mapTouchableNumber = (value: number) => {
    return <TouchableOpacity
      key={value}
      style={styles.numberButton}
      onPress={() => handleNumberPress(value)}
    >
      <Text style={styles.numberButtonText}>{value}</Text>
    </TouchableOpacity>
  }
  const renderNumberPad = () => {
    const rowOne = [1, 2, 3, 4, 5].map(mapTouchableNumber);
    var rowTwo = [6, 7, 8, 9].map(mapTouchableNumber);

    const clearButton = <TouchableOpacity style={styles.numberButton} onPress={handleClearPress}>
      <Text style={styles.numberButtonText}>X</Text>
    </TouchableOpacity>
    rowTwo = [...rowTwo, clearButton];

    return [<View style={styles.numberPadRow}>{rowOne}</View>,
    <View style={styles.numberPadRow}>{rowTwo}</View>];
  };

  const handleClearPress = () => {
    if (selectedCell) {
      onCellChange(selectedCell.row, selectedCell.col, undefined);
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
      <View style={styles.numberPadContainer}>
        <View style={styles.numberPad}>{renderNumberPad()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    borderWidth: 1,
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
  numberPadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  numberPad: {
    marginTop: 20,
    marginBottom: 10,
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SudokuGrid;