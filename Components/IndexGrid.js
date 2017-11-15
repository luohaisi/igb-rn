import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import { Grid } from 'antd-mobile';

export default class IndexGrid extends Component {
    
  render() {

    const data = Array.from(new Array(6)).map((_val, i) => ({
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`,
      }));

    const data1 = Array.from(new Array(6)).map(() => ({
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
      }));

    return (
        <View style={{backgroundColor:'#13A3E9',paddingTop:10}}>
            <Text style={{textAlign:'center',color:'#F2F2F2',fontSize:20,paddingBottom:10}}>月项目数据概览</Text>
            <Grid data={data1} 
                  activeStyle={false} 
                  columnNum={3}
                  hasLine={false}
                  renderItem={dataItem => (
                        <View style={{alignItems:'center',justifyContent:'space-around'}}>
                            <Text style={{color:'#F2F2F2'}}>进行中</Text>
                            <Text style={{color:'#E2EB36',fontSize:20}}>100</Text>
                        </View>
                    )} />
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
AppRegistry.registerComponent('IGreenBuy', () => IndexGrid);