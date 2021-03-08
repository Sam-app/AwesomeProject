/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import { PcodeEntries } from './src/components/PcodeEntries.component'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        
         <PcodeEntries />
  
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  screen : {
    flex: 1,
  }
});

export default App;
