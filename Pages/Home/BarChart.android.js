/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, WebView } from 'react-native';
import { SegmentedControl, List, Flex, ActivityIndicator } from 'antd-mobile';


export default class LineChart extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showBarChart: false
    }
    this.showBarChart()
  }

  showBarChart = () => {
    setTimeout(()=>{
      this.setState({
        showBarChart: true
      })
    },5000)
  }
  
  render() {
    return (
      this.state.showBarChart 
        ?
      <WebView
        source={{uri: 'http://igb.oss-cn-shanghai.aliyuncs.com/BarChart.html'}}
        style={{height:220}}
        // injectedJavaScript={js}
      />
        :
      <ActivityIndicator />
    )
  }
}