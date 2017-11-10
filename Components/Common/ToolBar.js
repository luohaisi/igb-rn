import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

export default class ToolBar extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1, height: 50, flexDirection: 'row',marginTop:30,borderBottomColor:'red',borderBottomWidth:1,padding:0,margin:0}}>
        <View style={{flex: 2, height: 50, alignItems:'center',justifyContent: 'center'}}>
            <Text>  </Text>
        </View>
        <View style={{flex: 6, height: 50, alignItems:'center',justifyContent: 'center'}}>
            <Text>绿智汇</Text>
        </View>
        <View style={{flex: 2, height: 50, alignItems:'center',justifyContent: 'center'}}>
        <Text style={{fontSize:30}}> + </Text>
        </View>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => ToolBar);