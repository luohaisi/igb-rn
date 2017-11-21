import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, WebView } from 'react-native';

import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';
import WebScreen from './Pages/WebScreen';
import SettingScreen from './Pages/SettingScreen';
import PasswordScreen from './Pages/PasswordScreen';
import FeedbackScreen from './Pages/FeedbackScreen';
import ClearCacheScreen from './Pages/ClearCacheScreen';
import AboutUsScreen from './Pages/AboutUsScreen';

import { StackNavigator } from 'react-navigation';

// 路由导航
const App = StackNavigator({
  
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Web:{screen: WebScreen},
  Setting:{screen: SettingScreen},
  // 设置内页
  Password:{screen:PasswordScreen},
  ClearCache:{screen:ClearCacheScreen},
  Feedback:{screen:FeedbackScreen},
  AboutUs:{screen:AboutUsScreen},
});

export default App;


