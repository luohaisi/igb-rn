/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from '../../Components/Ionicons';
import { Flex, List, Modal } from 'antd-mobile';

import OverviewModal from './OverviewModal'

export default class GeneralStatSection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showOverviewModal:false
    }
  }

  goToOverviewModal = () => {
    
    this.setState({showOverviewModal:true})
  }

  // 关闭登陆层时
  onRequestClose = () => {
    this.setState({
      showOverviewModal:false
    })
  }



  render() {
    const piRatioColor = this.props.dataSource.totalPiCompareRatioStr.indexOf('-') === -1 ? 'red': 'green';
    const amountRatioColor = this.props.dataSource.totalAmountCompareRatioStr.indexOf('-') === -1 ? 'red': 'green';

    return (
        <List>
          <List.Item 
            style={styles.listHeader}
            onClick={this.goToOverviewModal}
            extra={<Ionicons name={'ios-list-outline'} size={25} color={'#58b6ef'} />}>
            <Text style={styles.listHeaderText}>平台采购数据概览</Text>
            <Modal
                transparent
                popup={true}
                animationType="slide-up"
                footer={[{ text: '关闭', onPress: () => this.setState({showOverviewModal:false}) }]}
                visible={this.state.showOverviewModal}
                style={{width:'100%',height:window.innerHeight}}
              >
             
                  <OverviewModal params={this.props.params} />
             
            </Modal>
          </List.Item>
          
          <List.Item wrap thumb={<Ionicons name={'logo-buffer'} size={25} color={'#58b6ef'} />} >
            <Flex>
              <Flex.Item>
                <Flex>
                  <Flex.Item><Text style={styles.itemProject}>项目数量</Text></Flex.Item>
                  <Flex.Item><Text style={styles.amount}>{this.props.dataSource.totalPiCountStr}个</Text></Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Flex>
                  <Flex.Item><Text style={styles.itemProject2}>环比</Text></Flex.Item>
                  <Flex.Item><Text style={{color:piRatioColor,textAlign:'center'}}>{this.props.dataSource.totalPiCompareRatioStr}</Text></Flex.Item>
                </Flex>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item>
                <Flex>
                  <Flex.Item><Text style={styles.itemProject}>进行中</Text></Flex.Item>
                  <Flex.Item><Text style={styles.amount}>{this.props.dataSource.processingPiCountStr}个</Text></Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Flex>
                  <Flex.Item><Text style={styles.itemProject2}>已结束</Text></Flex.Item>
                  <Flex.Item><Text style={styles.amount}>{this.props.dataSource.finishedPiCountStr}个</Text></Flex.Item>
                </Flex>
              </Flex.Item>
            </Flex>
          </List.Item>
          <List.Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
            <Flex>
              <Flex.Item>
                <Flex>
                  <Flex.Item><Text style={styles.itemMoney}>采购金额</Text></Flex.Item>
                  <Flex.Item><Text style={styles.amount}>{this.props.dataSource.totalAmountStr}</Text></Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Flex>
                  <Flex.Item><Text style={styles.itemMoney}>环比</Text></Flex.Item>
                  <Flex.Item><Text style={{color:amountRatioColor,textAlign:'center'}}>{this.props.dataSource.totalAmountCompareRatioStr}</Text></Flex.Item>
                </Flex>
              </Flex.Item>
            </Flex>
          </List.Item>
        </List>
    )
  }
}

const styles = StyleSheet.create({

  itemProject:{
    paddingLeft:20,
    height:30,
    lineHeight:30
  },
  itemProject2:{
    paddingLeft:10,
    height:30,
    lineHeight:30
  },
  itemMoney:{
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