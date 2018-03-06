/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Ionicons from '../../Components/Ionicons';
import { SegmentedControl, List, Flex, Modal } from 'antd-mobile';

import LineChart from './LineChart'
import MyTable from '../../Components/MyTable'
import DetailModal from './DetailModal'

export default class LineChartSection extends React.Component {

  constructor(props){
    super(props)
    this.columns = this.getColumns();
    this.state = {
      selectedIndex: 0
    }
  }

  getColumns = () => {
    const columns = [{
        title: '日期',
        dataIndex: 'date',
        key: 'date',
    }, {
        title: '市场均价',
        dataIndex: 'marketPriceStr',
        key: 'marketPriceStr',
        // formatter: val => parseInt(val)
    }, {
        title: '集团均价',
        dataIndex: 'groupPrice',
        key: 'groupPrice',
        formatter: val => val ? val.toFixed(2) : null
    }];
    if (this.props.showEntPrice) {
        columns.push({
            title: '企业均价',
            dataIndex: 'entPrice',
            key: 'entPrice',
        })
    } else {
        columns.push({
            title: '隧道-市政-路桥',
            dataIndex: 'entPriceWithAllStr',
            key: 'entPriceWithAllStr',
        })
    }
    return columns;
}
  
  render() {
    // table数据预处理，去除空数组,提升渲染效率
    const dataTable = []
    this.props.dataTable.map((item, key)=>{
      if(item.groupPrice || item.entPrice || item.entPriceWithAllStr){
        dataTable.push(item) 
      }
    })
      
    return (
      <List>
        <List.Item 
          style={styles.listHeader}
          onClick={() => this.setState({showDetailModal:true})}
          extra={<Ionicons name={'ios-list-outline'} size={25} color={'#58b6ef'} />}>
          <Text style={styles.listHeaderText}>价格对比走势图</Text>
          <Modal
                transparent
                popup={true}
                animationType="slide-up"
                footer={[{ text: '关闭', onPress: () => this.setState({showDetailModal:false}) }]}
                visible={this.state.showDetailModal}
                style={{width:'100%',height:window.innerHeight,backgroundColor:'#6ab7e6'}}
              >
             
                  <DetailModal params={this.props.params} cateId={this.props.cateId} />
             
            </Modal>
        </List.Item>
        <List.Item>
          <SegmentedControl 
              style={{width:110,alignSelf:'center'}}
              className="segment-selector"
              values={['图表', '表格']}
              selectedIndex={this.state.selectedIndex}
              onChange={e=> this.setState({selectedIndex: e.nativeEvent.selectedSegmentIndex})}
            />
          {/* 图表 */}
        </List.Item>
        <List.Item multipleLine>
        {this.state.selectedIndex === 0 &&
          <LineChart
            dataSource={this.props.dataChart}
          />
        }
        {this.state.selectedIndex === 1 &&
          <MyTable
              height={190}
              dataSource={dataTable}
              columns={this.columns}
          />
        }

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