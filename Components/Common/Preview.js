import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

export default class Preview extends Component {
  render() {
    return (
      
        <View style={{flex: 1, height: 120, flexDirection: 'column'}}>
            <View style={{flex: 1, height: 100, justifyContent: 'center'}}>
                <Text style={{color:'#999999'}}> 企业数据概览 </Text>
            </View>
            <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center'}}>
                <Text style={{fontSize:30, color:'#FF662F'}}>123,4567,8900.00</Text>
            </View>
            <View style={{flex: 1, height: 60, alignItems:'center',justifyContent: 'center'}}>
                <Text style={{color:'#999999'}}> 总交易金额 </Text>
            </View>
        </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => Preview);