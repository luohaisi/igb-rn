/**
 * 20180402
 * @author luohaisi
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, WebView } from 'react-native';
import { Flex, WingBlank, List, WhiteSpace, ActivityIndicator, Toast, Accordion} from 'antd-mobile'

import FiltersSection from '../Project/FiltersSection'
import {EntPieChart} from '../../Conf/HtmlChart'
// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

export default class TongScreen extends React.Component {


  static navigationOptions = {
    title: '上海城建物资混凝土',
    headerStyle: {
      backgroundColor: '#117BE9',
    },
    headerTintColor: '#F2F2F2',
  };

  constructor(props) {
    super(props);
    this.token = null
    this.state = {
      remoteData: [],
      renderView:false
    }
    this.filterCondition = {
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
      token,
      requestType: 'CJWZ_CONCRETE_STATIC_OVERVIEW'
    }).then((res) => {
      if(res.return_code == '0' && res.return_message == "Success"){
        this.setState({
          remoteData: res.result,
          renderView:true
        })
        // console.log('remoteData', res.result)
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


  _renderOverviewCard = (item) => {

    return(
      <WingBlank size="sm">
        <Flex style={{height:30}}>
            <Flex.Item flex={2}>
              <Text style={styles.text}>采购金额：{item.parent.purchaseAmountStr}</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.text}>项目总数：{item.parent.piCountStr}</Text>
            </Flex.Item>
        </Flex>

        <Flex style={{height:30}}>
            <Flex.Item>
              <Text style={styles.text}>采购数量：{item.parent.purchaseQuantityStr}</Text>
            </Flex.Item>
        </Flex>
        <WhiteSpace />

        <Flex style={{height:30}}>
            <Flex.Item>
              <Text style={{alignSelf:'center', color:'#959595'}}>{'城建物资承接' + item.parentEnt.shortName  + '统计'}</Text>
            </Flex.Item>
        </Flex>

        <Flex style={{height:30}}>
            <Flex.Item flex={2}>
              <Text style={styles.text}>采购金额：{item.self.purchaseAmountStr}</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.text}>项目总数：{item.self.piCountStr}</Text>
            </Flex.Item>
        </Flex>

        <Flex style={{height:30}}>
            <Flex.Item>
              <Text style={styles.text}>采购数量：{item.self.purchaseQuantityStr}</Text>
            </Flex.Item>
        </Flex>
        
        {item.percentage.purchaseAmount > 0 && this._renderPieChart(item)}

      </WingBlank>
    )
  }

  _renderPieChart = (item) => {

    const chartData1 = [
      {item:'城建物资', count: item.percentage.purchaseAmount},
      {item:'其他', count: (1-item.percentage.purchaseAmount)}
    ];
    const chartData2 = [
      {item:'城建物资', count: item.percentage.purchaseQuantity},
      {item:'其他', count: (1 - item.percentage.purchaseQuantity)}
    ];
    const chartData3 = [
      {item:'城建物资', count: item.percentage.piCount},
      {item:'其他', count: (1 - item.percentage.piCount)}
    ];
    const purchaseAmount = JSON.stringify(chartData1)
    const purchaseQuantity = JSON.stringify(chartData2)
    const piCount = JSON.stringify(chartData3)

    const html1 = EntPieChart(purchaseAmount, '采购金额', "['#fbd437', '#3aa1ff']")
    const html2 = EntPieChart(purchaseQuantity, '采购数量', "['#fbd437', '#f2637b']")
    const html3 = EntPieChart(piCount, '项目数', "['#fbd437', '#4a0cbd']")

    return (
      <Flex>
      <Flex.Item>
        <WebView
          source={{html: html1, baseUrl: ''}}
          style={{height:190}}
          renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
        />
      </Flex.Item>
      <Flex.Item>
        <WebView
          source={{html: html2, baseUrl: ''}}
          style={{height:190}}
          renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
        />
      </Flex.Item>
      <Flex.Item>
        <WebView
          source={{html: html3, baseUrl: ''}}
          style={{height:190}}
          renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
        />
      </Flex.Item>
      </Flex>
    )
  }

  render(){

    if(this.state.renderView === true){


      return (
        <WingBlank size="sm" style={{marginBottom:100}}>
          <WhiteSpace />
          <FiltersSection 
            onUpdateFilter={this._onUpdateFilter} 
            showSearchbar={false}
            showFilterList={[4]}
          />

          <ScrollView>
            {this.state.remoteData.map((item, key) => {
              
              return (
                
                  <Accordion 
                    // defaultActiveKey="0" 
                    key={key} 
                    // onChange={(ActiveKey)=>console.log('ActiveKey:'+key, ActiveKey)}
                    style={{backgroundColor:'#fff', marginBottom:10}}>
                      <Accordion.Panel header={item.parentEnt.entName}>
                        {this._renderOverviewCard(item)}
                      </Accordion.Panel>
                  </Accordion>
              )
            })}
          </ScrollView>
        </WingBlank>
      )
    }else{
      return <ActivityIndicator toast text="正在加载" />
    }

  }

}


const styles = StyleSheet.create({
  title:{
    color: '#1aa6eb'
  },
  text:{
    color: '#959595'
  },
  listHeaderText:{
    color:'#777',
    fontSize:15,
    textAlign:'center'
  }
    
})