import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, WebView } from 'react-native';

import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';
import WebScreen from './Pages/WebScreen';

import { StackNavigator } from 'react-navigation';

// 路由导航
const App = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Web:{screen: WebScreen}
});

export default App;


