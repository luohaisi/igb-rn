/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Modal, ScrollView, Linking, Platform } from 'react-native';
import { WingBlank, WhiteSpace, Toast, NoticeBar, Button, Modal as ModalAntd, Flex } from 'antd-mobile';
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

// 版本检测接口
const url = 'http://www.igreenbuy.com/mobile/caigou.php?app=' + Platform.OS
const currentVersion = '2.0.1'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    // 设置默认开始时间
    const current = new Date();
    current.setDate(current.getDate() - 90)
    // 基本属性
    this.chooseCate = 3;

    this.dateInterval = 30
    this.dateFrom = dateFormat(current)
    this.dateTo = dateFormat(new Date())
    
    this.locationId = null

    this.locations = null
    this.entShortName = null

    this.token = null

    this.state = {
      showLoginModal: false,
      error:null,
      remoteData:null,
      showNoticeBar:false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      headerTitle: params ? params.title : '这是首页',
    }
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
        this.props.navigation.setParams({ title: data.entName })
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

    this._needToUpdate()

  }

  _renderMessage = (version) => {

    return(
`
有新的版本可供下载:
当前版本: ${currentVersion}
更新版本: ${version}
`
    )
  }

  // 是否需要更新
  _needToUpdate = () => {

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('responseJson', responseJson)
      if(responseJson.version > currentVersion){
        // 弹出提示框，跳转到下载链接
        ModalAntd.alert('更新提示', <Text style={{color:'#a1a1a1'}}>{this._renderMessage(responseJson.version)}</Text>, [
          { text: '暂不下载', onPress: () => console.log('cancel'),style:{color:'#a1a1a1'} },
          {
            text: '马上下载',
            onPress: () => this._notice(responseJson.url),
          },
        ])
      }
    })
    .catch((error) => {
      console.error(error);
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
    value.dateFrom ? this.dateFrom = value.dateFrom : null
    value.dateTo   ? this.dateTo   = value.dateTo : null
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

  _notice = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
    this.setState({
      showNoticeBar:false
    })
  }
    
  // 视图渲染部分
  renderView() {
    // console.log('renderView')
    return (
      <ScrollView>
      <WingBlank size="sm" style={{marginBottom:10}}>
        {/* 通知 */}
        {/* {this.state.showNoticeBar && 
          <NoticeBar mode="link" action={<Button type="primary" size="small" inline onClick={this._notice}>去下载</Button>}>
            有新的版本可供下载
          </NoticeBar>
        } */}
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
            navigate={this.props.navigation.navigate}
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
