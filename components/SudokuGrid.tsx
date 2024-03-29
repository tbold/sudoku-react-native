import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SudokuGridProps {
  grid: number[][];
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid }) => {
  return (
    <View style={styles.gridContainer}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View
              key={cellIndex}
              style={[
                styles.cell,
                (rowIndex + 1) % 3 === 0 && styles.bottomBorder,
                (cellIndex + 1) % 3 === 0 && styles.rightBorder,
              ]}
            >
              <Text style={styles.cellText}>{cell !== 0 ? cell : ''}</Text>
            </View>
          ))}
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
});

export default SudokuGrid;