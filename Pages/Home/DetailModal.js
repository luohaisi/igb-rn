/**
 * 20180117
 * @author luohaisi
 */
import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Flex, WhiteSpace, WingBlank, Modal, ActivityIndicator, Toast, Button } from 'antd-mobile'
// Services
import {getRemoteData} from '../../Services/CommonService.js'

import MyTable from '../../Components/MyTable'
import {
    cateNameObj
} from '../../Utils/functions'

 export default class DetailModal extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        remoteData:[],
        noMore:false
    }

    this.params = this.props.navigation.state.params
    this.params.filterCondition.pageSize = 10
    this.params.filterCondition.pageNumber = 1
    // console.log('params', this.params)
  }

  static navigationOptions = ({ navigation }) => {

    return {
      title: '详情',
      headerStyle: {
        backgroundColor: '#117BE9',
      },
      headerTintColor: '#F2F2F2',
    }
  }

    
  getRemoteData = () => {
    getRemoteData(this.params).then(
      response => {
          if(response.return_code == 0) {
              response.result && this.setState({
                  remoteData: [ ...this.state.remoteData, ...response.result ],
                  noMore:response.result.length > 0 ? false : true
              })
              // console.log('DetailModal', response.result)
          } else {
              // console.log('HomeModalPage:response', response)
          }
      }, (err) => {
          // console.log('HomeModalPage:response', err)
      }
    )
  }

  componentWillMount(){

      this.getRemoteData()
  }


  toFixNumber = (number) => {
      return (number*100).toFixed(2) + '%';
  }

  _goToProject = (piId) => {
      Toast.loading('正在加载...')
      this.props.navigation.navigate('ProjectDetail', {piId:piId})
  }

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProjectDetail', {piId:item.piId})}>
      <Card style={{marginBottom:20}}>
          <Card.Header
              title={<Text style={{color:'#50a9e6',fontSize:15}} onPress={()=>this._goToProject(item.piId)} >{item.piTitle}</Text>}
          />
          <Card.Body>

              <Flex style={{marginLeft:10}}>
                  <Flex.Item>
                      <Text style={style.fontsize12}>{this.props.navigation.state.params.filterCondition.mainCateId == 3 ? '市场均价': '企业均价'} ：{item.avgPriceStr}</Text>
                  </Flex.Item>
                  <Flex.Item>
                      <Text style={style.fontsize12}> 项目单价：{item.priceStr}</Text>
                  </Flex.Item>
                  <Flex.Item>
                      <Text style={{...style.fontsize12, display:'flex'}}>偏离度：
                      <Text style={{...style.fontsize12, display:'flex',color:item.deviation>0?'red':'green'}}>
                          {this.toFixNumber(item.deviation)}
                      </Text>
                      </Text>
                  </Flex.Item>
              </Flex>
              <Flex style={{marginLeft:10,marginTop:8}}>
                  <Flex.Item>
                      <Text style={style.fontsize12}>材料名：{item.productDesc}</Text>
                  </Flex.Item>
              </Flex>

          </Card.Body>
          <Card.Footer 
              content={'地区：' + item.areaStr}
              extra={'结束时间：' + item.finishedDate} />
      </Card>
      </TouchableOpacity>
  )

  renderHeader = () => {

    const { state } = this.props.navigation;
    const titlePre = state.params.filterCondition.mainCateId == 3 ? '上海地区':''

    return(
        <Flex >
            <Flex.Item style={{alignItems:'center', height:30,marginTop:20}}>
                <Text style={{color:'#f2f2f2',fontSize:18,fontWeight:'bold'}}>
                  {titlePre}{cateNameObj[state.params.filterCondition.mainCateId]}价格对比详情
                </Text>
            </Flex.Item>
        </Flex>
    )
  }

  _fetchMoreData= () => {        

    this.params.filterCondition.pageNumber++
    this.getRemoteData()
  }

  _renderFooter = () => {

    return (
      <View>
        {this.state.noMore ? 
          <Text style={{alignSelf:'center', color:'#a1a1a1'}}>没有更多了</Text>  
          :
          <Button onClick={this._fetchMoreData}>加载更多</Button>
        }
      </View>
    )
  }

  render(){
      if(this.state.remoteData.length == 0){
          return<ActivityIndicator toast text="正在加载" />
      }
      return (
          <View style={{backgroundColor:'#6ab7e6'}}>
              <WingBlank size="sm">
                  <FlatList
                      data={this.state.remoteData}
                      renderItem={this._renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      ListHeaderComponent={this.renderHeader}
                      ListFooterComponent={this._renderFooter}
                  />
              </WingBlank>
          </View>
      )
  }
 } 

 const style = {
    fontsize12:{
        fontSize:12
    }
 }