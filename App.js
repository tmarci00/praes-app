
import { StyleSheet, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import './global';

export default function App() {
  return (
    <View style={styles.container}>
    <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
