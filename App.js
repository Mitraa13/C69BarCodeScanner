import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './Screens/ScanScreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

var TabNavigator = createSwitchNavigator({
  ScanScreen: ScanScreen,
})

const AppContainer = createAppContainer (TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
