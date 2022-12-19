
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faCartShopping, faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import './global';
import Navigation from './navigation';

library.add(faMinus, faCartShopping, faAppleWhole);
export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
