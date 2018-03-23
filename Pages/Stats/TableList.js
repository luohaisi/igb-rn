/**
 * 20180322
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex, List } from 'antd-mobile';

import Table from '../../Components/Table'

export default class TableList extends React.Component {

  constructor(props){
    super(props)
    console.log('TableList', this.props.dataSource)
  }

  /**
   * 把金额数字格式化
   */
  // numberFormatter = (val) => {
  //   if(val >= 100000000){
  //       return val.toFixed(2) + '(' + (val/100000000).toFixed(2) + '亿元' + ')'
  //   }else if(val >= 10000){
  //       return val.toFixed(2) + '(' + (val/10000).toFixed(2) + '万元' + ')'
  //   }else if(val){
  //       val.toFixed(2)
  //   }
  //   return null
  // }
  numberFormatter = (val) => {
    if(val >= 100000000){
        return (val/100000000).toFixed(2) + '亿元'
    }else if(val >= 10000){
        return (val/10000).toFixed(2) + '万元'
    }else if(val){
        return val.toFixed(2)
    }
    return null
  }

  render(){

    const columns = [{
        title: '企业简称',
        dataIndex: 'entName',
        key: 'entName',
      }, {
        title: '采购金额',
        dataIndex: 'purchaseAmount',
        key: 'purchaseAmount',
        formatter: this.numberFormatter
      }, {
        title: '项目数量',
        dataIndex: 'piCount',
        key: 'piCount',
      }];

      const columns2 = [{
        title: '企业简称',
        dataIndex: 'entName',
        key: 'entName',
      }, {
        title: '采购数量',
        dataIndex: 'purchaseQuantity',
        key: 'purchaseQuantity',
      }, {
        title: '采购均价',
        dataIndex: 'averagePrice',
        key: 'averagePrice',
        formatter: val => val.toFixed(2)
      }];

      const columns3 = [{
        title: '采购材料',
        dataIndex: 'cateName',
        key: 'cateName',
      }, {
        title: '采购金额',
        dataIndex: 'purchaseAmount',
        key: 'purchaseAmount',
        formatter: this.numberFormatter
      }, {
        title: '项目数量',
        dataIndex: 'piCount',
        key: 'piCount',
      }];

      const columns4 = [{
        title: '采购材料',
        dataIndex: 'cateName',
        key: 'cateName',
      }, {
        title: '采购均价',
        dataIndex: 'averagePrice',
        key: 'averagePrice',
        formatter: val => val.toFixed(2)
      }, {
        title: '采购数量',
        dataIndex: 'purchaseQuantity',
        key: 'purchaseQuantity',
        formatter: val => val.toFixed(2)
      }];

      const columns5 = [{
        title: '月份',
        dataIndex: 'month',
        key: 'month',
      }, {
        title: '采购金额',
        dataIndex: 'purchaseAmount',
        key: 'purchaseAmount',
        formatter: this.numberFormatter
      }, {
        title: '项目数量',
        dataIndex: 'piCount',
        key: 'piCount',
      }];

    return(
        <List>
            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>企业采购金额，采购项目</Text>
            </List.Item>
            <List.Item multipleLine>
                <Table
                  dataSource={this.props.dataSource.groupByEnt}
                  columns={columns}
                />

            </List.Item>
      
            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>企业采购数量，采购均价</Text>
            </List.Item>
            <List.Item multipleLine>
                <Table
                  dataSource={this.props.dataSource.groupByEnt}
                  columns={columns2}
                />

            </List.Item>
       
            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>材料采购金额，采购项目</Text>
            </List.Item>
            <List.Item multipleLine>
                <Table
                  dataSource={this.props.dataSource.groupByCate}
                  columns={columns3}
                />

            </List.Item>
       
            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>材料采购数量，采购均价</Text>
            </List.Item>
            <List.Item multipleLine>
                <Table
                  dataSource={this.props.dataSource.groupByCate}
                  columns={columns4}
                />

            </List.Item>
       
            <List.Item 
              style={styles.listHeader}
            >
            <Text style={styles.listHeaderText}>采购金额，采购项目时间走势</Text>
            </List.Item>
            <List.Item multipleLine>
                <Table
                    dataSource={this.props.dataSource.groupByTime}
                    columns={columns5}
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