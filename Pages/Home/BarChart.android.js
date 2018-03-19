/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, WebView } from 'react-native';
import { SegmentedControl, List, Flex, ActivityIndicator } from 'antd-mobile';

export default class BarChart extends React.Component {

  
  render() {

    const data = this.props.dataSource
    if(!data) {
      return <Text>nothing</Text>
    }
    const dataStr = JSON.stringify(this.props.dataSource)
    const cateName = this.props.cateId == 1 ? '立方' : '吨'
    let params = {
      dataStr:dataStr,
      cateName:cateName
    }
    const randNum = Math.random()
      
    return (
      <View>
        <WebView
          // source={{uri: 'http://igb.oss-cn-shanghai.aliyuncs.com/LineChart.html'}}
          source={{uri: 'http://106.15.88.4/index.php/bar?'+randNum, method:'POST', body:JSON.stringify(params)}}
          style={{height:data.length * 70,paddingBottom:0}}
          renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
        />
      </View>
    );
  }
}