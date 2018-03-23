/**
 * 20180322
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex, List } from 'antd-mobile';

export default class OverviewSection extends React.Component {

  constructor(props){
    super(props)
  }


  render(){

    return (
      <List>
          <List.Item style={styles.listHeader}>
            <Text style={styles.listHeaderText}>统计概览</Text>
          </List.Item>
          
          <List.Item wrap  >
            <Flex>
              <Flex.Item flex={3}>
                <Text style={styles.itemProject}>
                  采购金额: &nbsp;
                  <Text style={styles.amount}>{this.props.dataSource.purchaseAmountStr}</Text>
                  {this.props.dataSource.purchaseAmountUnitStr}
                </Text>
              </Flex.Item>
              <Flex.Item flex={2}>
                <Text style={styles.itemProject}>
                  项目总数: &nbsp;
                  <Text style={styles.amount}>{this.props.dataSource.piCountStr}</Text>
                  {this.props.dataSource.piCountUnitStr}
                </Text>
              </Flex.Item>
            </Flex>

            <Flex>
              <Flex.Item flex={3}>
                <Text style={styles.itemProject}>
                  采购数量: &nbsp;
                  <Text style={styles.amount}>{this.props.dataSource.purchaseQuantityStr}</Text>
                  {this.props.dataSource.purchaseQuantityUnitStr}
                </Text>
              </Flex.Item>
              <Flex.Item flex={2}>
                <Text style={styles.itemProject}>
                  采购均价: &nbsp;
                  <Text style={styles.amount}>{this.props.dataSource.averagePriceStr}</Text>
                  {this.props.dataSource.averagePriceUnitStr}
                </Text>
              </Flex.Item>
            </Flex>
          </List.Item>
        </List>
    )
  }
}

const styles = StyleSheet.create({

  itemProject:{
    height:30,
    lineHeight:30
  },
  amount:{
    color:'#008aeb',
    textAlign:'center'
  },
  listHeader:{
    // backgroundColor:'#f0f6fe',
    height:36
  },
  listHeaderText:{
    color:'#777',
    fontSize:15,
    textAlign:'center'
  }
})