import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import ToolBar from '../Common/ToolBar';

export default class Index extends Component {
  render() {
    return (
      <View>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />

      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => Index);