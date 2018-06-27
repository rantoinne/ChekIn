import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Navig from './Navig';
import Profile from './Profile';
import Pacific from './Pacific';
import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
  Navig: {
    screen: Navig
  },
  Pacific: {
    screen: Pacific
  },
  Profile: {
    screen: Profile
  }
});

export default AppNavigator;