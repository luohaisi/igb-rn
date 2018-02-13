/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, WebView } from 'react-native';
import { SegmentedControl, List, Flex, ActivityIndicator } from 'antd-mobile';

import {HomeBarChart} from '../../Conf/HtmlChart'


export default class LineChart extends React.Component {

  constructor(props){
    super(props)
  }

  render() {

    const data = this.props.dataSource
    if(!data) {
      return <Text>nothing</Text>
    }
    const dataStr = JSON.stringify(this.props.dataSource)

    const cateName = JSON.stringify(this.props.cateId == 1 ? '立方' : '吨')

    const html = HomeBarChart(dataStr,cateName)
      
  // console.log('injectedJavaScript', dataStr)
    return (
            <WebView
              source={{html: html}}
              style={{height:data.length * 70,paddingBottom:0}}
              renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
            />
    );
  }
}