/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Flex, WingBlank, List, WhiteSpace, Button, Toast, ActivityIndicator} from 'antd-mobile'
import FiltersSection from './FiltersSection'
import OverviewSection from './OverviewSection'
import ChartSection from './ChartSection'
// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

export default class StatsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      remoteData:[],
      renderView:false
    }

    // 基本属性
    this.filterCondition = {
      pageSize:100,
      pageNumber:1
    }

    this.willFocusSubscription
  }

  // 
  willFocusSubscription = this.props.navigation.addListener(
    'didFocus',
    payload => {
      
      if(payload.action.type == 'Navigation/NAVIGATE'){
        this._init()
        // console.debug('willFocus', payload);
      }
    }
  )

  _init(){

    // 从接口请求默认数据
    ls.get('userInfo').then((data) => {
      if(data && data.token){
        this.token = data.token
        this.entId = data.entId
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
      filterCondition: this.filterCondition,
      token,
      requestType: 'STATIC_OVERVIEW'
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


  render() {
    if(this.state.renderView === true){
      return (
      <WingBlank size="sm" style={{marginBottom:80}}>
        
        <FiltersSection onUpdateFilter={this._onUpdateFilter} entId={this.entId} navigation={this.props.navigation} />
        <WhiteSpace />

        <ScrollView>
          <OverviewSection dataSource={this.state.remoteData.overview} />
          <WhiteSpace />

          <WingBlank size="sm">
            <ChartSection dataSource={this.state.remoteData} />
          </WingBlank>
        </ScrollView>



      </WingBlank>
      )
    }else{
      return <ActivityIndicator toast text="正在加载" />
    }
  }
}