/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Button, Modal, ScrollView } from 'react-native';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
var ls = require('react-native-local-storage');

import DateFilterSection from './DateFilterSection'
import GeneralStatSection from './GeneralStatSection'
import CateStatSection from './CateStatSection'
import LineChartSection from './LineChartSection'
import BarChartSection from './BarChartSection'
import LoginModal from './LoginModal'
// Services
import {getRemoteData}  from '../../Services/CommonService.js'

import {
  dateFormat
} from '../../Utils/functions'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    // 基本属性
    this.chooseCate = 3;

    this.dateInterval = 30
    this.dateFrom = '2017-1-7'
    this.dateTo = '2018-2-6'
    
    this.locationId = null

    this.locations = null
    this.entShortName = null

    this.token = null

    this.state = {
      showLoginModal: false,
      error:null,
      remoteData:null
    };
  }

  componentWillMount() {

    TheBrowser = this
  }

  componentDidMount(){
    // 仅测试时清除用户数据
    // ls.clear()

    // 从接口请求默认数据
    ls.get('userInfo').then((data) => {
      if(data && data.token){
        this.token = data.token
        this.entShortName = data.entShortName
        this.entId = data.entId
        this.locations = data.locations.map((item, key) => {
          return{
            label:item.value,
            value:item.id,
          }
        })
        // 获取远程数据
        this.getRemoteData()
  
      }else{
        this.setState({
          showLoginModal:true
        })
      }
      
    });
  }

  // 获取/更新远程服务器数据
  getRemoteData = () => {
    
      let token = this.token
      getRemoteData({
        filterCondition: {
            mainCateId: this.chooseCate,
            recentBeginDate : this.dateFrom,
            recentEndDate : this.dateTo,
            location:this.locationId
        },
        token,
        useNew : 'true',
        requestType: 'HOME_OVERVIEW_GENERAL'
      }).then((res) => {
        if(res.return_code == '0' && res.return_message == "Success"){
          this.setState({
            remoteData: res.result[0]
          })
          // console.log('getRemoteData', res.result[0].materialStatData)
        // }else if (res.return_code == '-1' && res.return_message == "(Mobile)未登录或者登陆失效, 请重新登录"){
        //   //TOFIX: 失败后需要登陆，清空localStorage,弹出登陆页
        //   this.setState({
        //     showLoginModal:true,
        //     remoteData:null
        //   })
        }else{
          // ls.remove('userInfo')
          Toast.fail(res.return_message, 2, ()=>{
            this.setState({
              showLoginModal:true,
              remoteData:null
            })
          });
        }
      })
  }

  // 关闭登陆层时
  onRequestClose = () => {
    this.setState({
      showLoginModal:false
    })
  }

  // 日期范围选择结束时
  onDateRangePickerConfirm = (value) => {
    // console.log('onDateRangePickerConfirm:value', value)
    this.dateFrom = value.dateFrom
    this.dateTo   = value.dateTo
    this.getRemoteData()

  }
  // 城市选择结束时 
  onCityChange = (val) => {

    this.locationId = val
    this.getRemoteData()
  }

  // 登陆成功后的操作
  onLoginSuccess = (userInfo) => {

    ls.save('userInfo', userInfo).then(() => {

        this.entShortName = userInfo.entShortName
        this.entId = userInfo.entId
        this.locations = userInfo.locations.map((item, key) => {
          return{
            label:item.value,
            value:item.id,
          }
        })
        this.token = userInfo.token
        // 获取远程数据
        this.getRemoteData()
    })
    
    this.onRequestClose()
  }

  /**
     * 按材料筛选
     */
  updateRemoteDataByCateId = (tab, index) => {
    // console.log('updateRemoteDataByCateId', tab.cateId)
    this.chooseCate = tab.cateId
    this.getRemoteData()
  }
    
  // 视图渲染部分
  renderView() {
    // console.log('renderView')
    return (
      <ScrollView>
      <WingBlank size="sm">
        {/* 顶部筛选条件区块 */}
        <DateFilterSection
          params={{
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            locations: this.locations
          }}
          onDateRangePickerConfirm={this.onDateRangePickerConfirm}
          onCityChange={this.onCityChange}
        />
        <WhiteSpace />
        {/* 数据总览 */}
        <GeneralStatSection
          dataSource={this.state.remoteData.generalStatData}
          params={{
            token:this.token,
            filterCondition: {
                recentBeginDate : this.dateFrom,
                recentEndDate : this.dateTo,
                location:this.locationId
            },
            requestType: "HOME_OVERVIEW_DETAIL_FOR_GENERAL",
          }}
        />
        <WhiteSpace size="lg" />

        <WingBlank size="sm">
          {/* 材料价格 */}
          <CateStatSection
            onTabClick={this.updateRemoteDataByCateId}
            dataSource={this.state.remoteData.materialStatData}
            entShortName={this.entShortName}
            entId={this.entId}

          />
          {/* 多线图 */}
          <LineChartSection
            dataChart={this.state.remoteData.mixedPriceByTime}
            dataTable={this.state.remoteData.mixedPriceByTimeRaw}
            showEntPrice={this.entId != 6}
            cateId={this.chooseCate}
            params={{
              token:this.token,
              filterCondition: {
                mainCateId: this.chooseCate,
                recentBeginDate : this.dateFrom,
                recentEndDate : this.dateTo,
                location:this.locationId
              },
              requestType: "HOME_OVERVIEW_DETAIL_FOR_MATERIAL",
            }}
          />
          {/* 双柱状图 */}
          <BarChartSection
            dataChart={this.state.remoteData.groupByEnt}
            cateId={this.chooseCate}
          />

        </WingBlank>
      </WingBlank>
      </ScrollView>
    );
  }
  // 固定方法（区别获取数据前/后的显示样式）
  render() {
    const { error, remoteData } = this.state;
    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!remoteData) {
        return (
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.showLoginModal}
              onRequestClose={() => this.onRequestClose()}
            >
              <LoginModal onSumit={this.onLoginSuccess} />
          </Modal>
        );
    } else {
        return this.renderView()
    }
  }

}
