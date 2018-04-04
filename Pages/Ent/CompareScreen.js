/**
 * 20180327
 * @author luohaisi
 */
import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { Flex, WingBlank, List, WhiteSpace, ActivityIndicator, Toast, Tag} from 'antd-mobile'

import FiltersSection from './FiltersSection'
// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

export default class CompareScreen extends React.Component {

  static navigationOptions = {
    title: '企业对比',
    headerStyle: {
      backgroundColor: '#117BE9',
    },
    headerTintColor: '#F2F2F2',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // }
  };

  constructor(props) {
    super(props);
    this.token = null
    this.pickedEnts = props.navigation.state.params.pickedEnts
    this.state = {
      remoteData: [],
      renderView:false
    }
    console.log('this.pickedEnts', this.pickedEnts)
    this.filterCondition = {
      cateId:null,
      pbBeginDate:null,
      pbEndDate:null
    }
  }

  componentWillMount(){
    // 从接口请求默认数据
    ls.get('userInfo').then((data) => {
        if(data && data.token){
        this.token = data.token
        // 获取远程数据
        this.getRemoteData()
    
        }else{
        Toast.fail('获取用户信息失败。', 2)
        }
        
    });
  }

  // 获取/更新远程服务器数据
  getRemoteData = () => {

    let token = this.token
    getRemoteData({
      filterCondition:this.filterCondition,
      selectedEntList:this.pickedEnts,
      token,
      requestType: 'ENT_COMPARISION'
    }).then((res) => {
      if(res.return_code == '0' && res.return_message == "Success"){
        this.setState({
          remoteData: res.result[0],
          renderView:true
        })
        // console.log('remoteData', res.result[0])
      }else{
        // ls.remove('userInfo')
        Toast.fail(res.return_message, 2, ()=>{
          this.setState({
            remoteData:null
          })
        });
      }
    })
  }

  _onUpdateFilter = (params) => {

    this.filterCondition = params

    this.getRemoteData()

    console.log('_onUpdateFilter', params)
  }

  _onChange(selected) {
    console.log(`tag selected: ${selected}`);
  }

  _renderItem = (rowData, title) => {

    return(
      <List.Item>
        <Flex >
        <Flex.Item><Text style={{color:'#a1a1a1'}}>{title}</Text></Flex.Item>
          {rowData.map((item, key) => {
            return (
              <Flex.Item key={key} style={styles.columnStyle}>
                <Text>{item}</Text>
              </Flex.Item>
            )
          })}
        </Flex>
      </List.Item>
    )
  }

  render() {

    if(this.state.renderView === true){
      return (
      <WingBlank size="sm" style={{marginBottom:80}}>
        
        <FiltersSection onUpdateFilter={this._onUpdateFilter} />
        <WhiteSpace />
        <Flex wrap="wrap" style={{paddingLeft:20, backgroundColor:'#FFFFFF', borderRadius:5}}>
          {this.state.remoteData.entList.map((item,key) => {
            return (
              <Tag 
                style={{margin:10}}
                // closable
                // selected
                onClose={() => console.log('onClose')}
                onChange={this._onChange}
                key={key}
              >
                {item}
              </Tag>
            )
          })}
        </Flex>
        <WhiteSpace />

        <List>
          {this._renderItem(this.state.remoteData.entList, '企业名称')}
          {this._renderItem(this.state.remoteData.totalAmountStrList, '采购金额')}
          {this._renderItem(this.state.remoteData.quantityStrList, '采购数量')}
          {this._renderItem(this.state.remoteData.averagePriceStrList, '平均单价')}
          {this._renderItem(this.state.remoteData.totalPiCountStrList, '项目总数')}
          {this._renderItem(this.state.remoteData.runningPiCountStrList, '进行中')}
          {this._renderItem(this.state.remoteData.finishedPiCountStrList, '已结束')}
        </List>

      </WingBlank>
        )
    }else{
      return <ActivityIndicator toast text="正在加载" />
    }

  }
}

const styles = {
  columnStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:39,
    // borderWidth:1,
    // borderColor:'#f2f2f2'
  }
}