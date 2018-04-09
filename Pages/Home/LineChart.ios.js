/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, WebView } from 'react-native';
import { SegmentedControl, List, Flex, ActivityIndicator } from 'antd-mobile';

import {HomeLineChart} from '../../Conf/HtmlChart'


export default class LineChart extends React.Component {

  constructor(props){
    super(props)
  }

  render() {

    const dataStr = JSON.stringify(this.props.dataSource)

    const html = HomeLineChart(dataStr)
      
  // console.log('injectedJavaScript', dataStr)
    return (
            <WebView
              source={{html: html}}
              scrollEnabled={false}
              style={{height:210,paddingBottom:0}}
              renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
            />
    );
  }
}