/**
 * 20180322
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex, List, Tabs } from 'antd-mobile';

import ChartList from './ChartList'
import TableList from './TableList'

export default class ChartSection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showCharts:true
    }
  }

  _onTabClick = (tab, index) => {
    // console.log('_onTabClick', index)
    this.setState({
      showCharts:index == 0 ? true : false
    })
  }

  render(){
    const tabs = [
        { title: '图表'},
        { title: '表格',}
      ];
    return (
        <View style={styles.container}>
            <Flex>
            <Tabs 
                initialPage={0}
                tabs={tabs} 
                onTabClick={this._onTabClick}
                // animated={false}
            >
                {/* tab 内容 */}
            </Tabs>
          </Flex>

          {/* 图表展示 */}
          {this.state.showCharts == true && 
            <ChartList dataSource={this.props.dataSource} />
          }

          {/* 表格展示 */}
          {this.state.showCharts == false &&
            <TableList dataSource={this.props.dataSource} />
          }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#ffffff',
      paddingTop:5,
      borderTopLeftRadius:5,
      borderTopRightRadius:5
    }
      
  })