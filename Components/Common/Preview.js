import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

export default class Preview extends Component {
  render() {
    return (
      
        <View style={{flex: 1, height: 100, flexDirection: 'column'}}>
            <View style={{flex: 1, height: 100, justifyContent: 'center'}}>
                <Text> 企业数据概览 </Text>
            </View>
            <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center'}}>
                <Text style={{fontSize:30}}>123,4567,8900.00</Text>
            </View>
            <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center'}}>
                <Text> 总交易金额 </Text>
            </View>
        </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => Preview);