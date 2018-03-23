/**
 * 20180322
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import { Flex, List } from 'antd-mobile';

import {
  StatsIntervalChart,
  StatsIntervalChart3,
  StatsIntervalChart5
} from '../../Conf/HtmlChart'

export default class ChartList extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    const groupByEnt = JSON.stringify(this.props.dataSource.groupByEnt)
    const groupByCate = JSON.stringify(this.props.dataSource.groupByCate)
    const groupByTime = JSON.stringify(this.props.dataSource.groupByTime)

    const htmlGroupByEnt = StatsIntervalChart(groupByEnt)
    const htmlGroupByCate = StatsIntervalChart3(groupByCate)
    const htmlGroupByTime = StatsIntervalChart5(groupByTime)

    return(

      <List>
            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>企业采购金额，采购项目</Text>
            </List.Item>
            <List.Item multipleLine>
              <WebView
                source={{html: htmlGroupByEnt}}
                style={{height:190,paddingBottom:0}}
                renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
              />
            </List.Item>

            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>企业采购金额，采购均价</Text>
            </List.Item>
            <List.Item multipleLine>
              <WebView
                source={{html: htmlGroupByEnt}}
                style={{height:190,paddingBottom:0}}
                renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
              />
            </List.Item>

            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>材料采购金额，采购项目</Text>
            </List.Item>
            <List.Item multipleLine>
              <WebView
                source={{html: htmlGroupByCate}}
                style={{height:190,paddingBottom:0}}
                renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
              />
            </List.Item>

            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>材料采购数量，采购均价</Text>
            </List.Item>
            <List.Item multipleLine>
              <WebView
                source={{html: htmlGroupByCate}}
                style={{height:190,paddingBottom:0}}
                renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
              />
            </List.Item>

            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>采购金额，采购项目时间走势</Text>
            </List.Item>
            <List.Item multipleLine>
              <WebView
                source={{html: htmlGroupByTime}}
                style={{height:190,paddingBottom:0}}
                renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
              />
            </List.Item>

        </List>
      
    )
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