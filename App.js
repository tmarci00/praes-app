
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import './global';
import Navigation from './navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
