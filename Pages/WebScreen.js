import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, WebView } from 'react-native';

import {F2} from '../Components/Html/F2.chart'

const data = [
  { time: '周一', tem: 10, city: 'beijing' },
  { time: '周二', tem: 22, city: 'beijing' },
  { time: '周三', tem: 20, city: 'beijing' },
  { time: '周四', tem: 26, city: 'beijing' },
  { time: '周五', tem: 20, city: 'beijing' },
  { time: '周六', tem: 26, city: 'beijing' },
  { time: '周日', tem: 28, city: 'beijing' },
  { time: '周一', tem: 5, city: 'newYork' },
  { time: '周二', tem: 12, city: 'newYork' },
  { time: '周三', tem: 26, city: 'newYork' },
  { time: '周四', tem: 20, city: 'newYork' },
  { time: '周五', tem: 28, city: 'newYork' },
  { time: '周六', tem: 26, city: 'newYork' },
  { time: '周日', tem: 20, city: 'newYork' }
];

// var html = require('../html/f2.html')
const html = F2()
const dataStr = JSON.stringify(data)

const js = `

  const data = ${dataStr}
  const chart = new F2.Chart({
    id: 'mountNode',
    pixelRatio: window.devicePixelRatio,
    width: window.innerWidth,
    height:500,
    padding: [ 40, 40, 50, 50 ]
  });
  const defs = {
    time: {
      tickCount: 7,
      range: [ 0, 1 ]
    },
    tem: {
      tickCount: 5,
      min: 0
    }
  };
    // 配置time刻度文字样式
  const label = {
    fill: '#979797',
    font: '14px san-serif',
    offset: 6
  };
  chart.axis('time', {
    label(text, index, total) {
      const cfg = label;
        // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
      if (index === 0) {
        cfg.textAlign = 'start';
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'end';
      }
      return cfg;
    }
  });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
  chart.axis('tem', {
    label: {
      fontSize: 14
    }
  });
  chart.source(data, defs);
  chart.line().position('time*tem')
    .color('city')
    .shape('smooth');
  chart.render();
`

export default class WebScreen extends Component {

  static navigationOptions = {
    title: '子页面测试',
  };

  render() {


    return (
      <WebView
        source={{uri: 'https://igb.oss-cn-shanghai.aliyuncs.com/chart.html'}}
        style={{marginTop: 20,backgroundColor:'#f2f2f2',width:'100%',height:'50%'}}
        injectedJavaScript={js}
      />
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => WebScreen);