import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import AppNavigator from './Stacker';
import Terms from './Terms';

const App = DrawerNavigator({
  Menu: {
    screen: AppNavigator
  },
  Terms: {
    screen: Terms,
  }
});

export default App;