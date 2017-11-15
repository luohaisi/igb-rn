import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, WebView } from 'react-native';

import HomeScreen from './Pages/HomeScreen';
import WebScreen from './Pages/WebScreen';

import { StackNavigator } from 'react-navigation';

// 路由导航
const App = StackNavigator({
  Home: { screen: HomeScreen },
  Web:{screen: WebScreen}
});

export default App;


