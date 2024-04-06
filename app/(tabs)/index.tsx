import { ActivityIndicator, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import SudokuGrid from '@/components/SudokuGrid';
import { fetchSudokuGrid } from '@/services/sudokuService';
import { CellResponse } from '@/types';

export default function TabOneScreen() {
  const [grid, setGrid] = useState<CellResponse[][] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchSudokuGrid();
      setGrid(response.newboard.grids[0].value);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleCellChange = (row: number, col: number, value?: number) => {
    if (grid) {
      const updatedGrid = [...grid];

      if (updatedGrid[row][col].value == value) {
        updatedGrid[row][col].value = undefined;
      } else {
        updatedGrid[row][col].value = value;
      }
      setGrid(updatedGrid);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Sudoku</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {grid && <SudokuGrid grid={grid} onCellChange={handleCellChange} />}
      </View>
    </ScrollView>

  );
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: screenWidth * 0.08,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: screenWidth * 0.05,
    height: 1,
    width: '80%',
  },
});
