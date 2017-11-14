import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class Grid extends Component {
    
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1}}>
            <View style={{flex: 1, height: 100, flexDirection: 'row'}}>
                <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center',borderWidth:1}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate('Index')}
                        >
                        <Text>进行中</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center',borderWidth:1}}>
                    <Text>绿智汇</Text>
                </View>
                <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center',borderWidth:1}}>
                    <Text> 进行中 </Text>
                </View>
            </View>
            <View style={{flex: 1, height: 100, flexDirection: 'row'}}>
                <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center',borderWidth:1}}>
                    <Text> 进行中 </Text>
                </View>
                <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center',borderWidth:1}}>
                    <Text>绿智汇</Text>
                </View>
                <View style={{flex: 1, height: 100, alignItems:'center',justifyContent: 'center',borderWidth:1}}>
                    <Text> 进行中 </Text>
                </View>
            </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  }
});


// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => Grid);