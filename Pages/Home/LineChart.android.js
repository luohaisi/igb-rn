/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, WebView } from 'react-native';
import { List, Flex, ActivityIndicator } from 'antd-mobile';

var WEBVIEW_LINECHART = 'webview';

export default class LineChart extends React.Component {

  reload = () => {
    this.refs[WEBVIEW_LINECHART].reload();
  }
  
  render() {

    const dataStr = JSON.stringify(this.props.dataSource)
      
    return (
      <View>
        <WebView
          // source={{uri: 'http://igb.oss-cn-shanghai.aliyuncs.com/LineChart.html'}}
          source={{uri: 'http://106.15.88.4', method:'POST', body:dataStr}}
          style={{height:210}}
          ref={WEBVIEW_LINECHART}
          // startInLoadingState
          // javaScriptEnabled={true}
          // domStorageEnabled={true}
          // mixedContentMode='always'
          // thirdPartyCookiesEnabled
          // scrollEnabled
          // injectedJavaScript={js}
          renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
        />
      </View>
    );
  }
}