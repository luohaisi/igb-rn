/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, WebView, StyleSheet } from 'react-native';
import { SegmentedControl, List, Flex } from 'antd-mobile';

import BarChart from './BarChart'

export default class BarChartSection extends React.Component {
    render() {
      return (
        <List>
        <List.Item style={styles.listHeader}>
            <Text style={styles.listHeaderText}>集团内部采购数量和价格对比</Text>
        </List.Item>

        <List.Item wrap>
            <BarChart
              dataSource={this.props.dataChart}
              cateId={this.props.cateId}
            />
        </List.Item>
      </List>
      );
    }
  }

  const styles = StyleSheet.create({
    listHeader:{
      backgroundColor:'#f0f6fe',height:36
    },
    listHeaderText:{
      color:'#777',
      fontSize:15,
      textAlign:'center'
    }
      
  })