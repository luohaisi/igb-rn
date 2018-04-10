/**
 * 20180320
 * @author luohaisi
 */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Flex, WingBlank, List, WhiteSpace, Button, Toast, Accordion, ActivityIndicator} from 'antd-mobile'
import FiltersSection from './FiltersSection'
import Ionicons from '../../Components/Ionicons';

// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

const Item = List.Item;
const Brief = Item.Brief;

export default class SupplierScreen extends React.Component {

  constructor(props) {
    super(props);
    // 基本属性
    this.filterCondition = {
      pageSize:10,
      pageNumber:1
    }

    this.token = null

    this.state = {
      remoteData:[],
      supplierList:[],
      searchKey:'',
      renderView:false
    }
    this.didFocusSubscription
  }

  // 
  didFocusSubscription = this.props.navigation.addListener(
    'didFocus',
    payload => {
      // console.log('payload', payload)
      if(payload.action.type == 'Navigation/NAVIGATE'){
        this._init()
        this.setState({
          renderView:true
        })
      }
    }
  )

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    
    return {
      tabBarOnPress:(object)=>{
        navigate(object.scene.route.routeName)
        // console.log('object', object)
      }
    }
  }
  
  _init(){
    // 重新打开后页码还原
    this.filterCondition.pageNumber = 1
    this.setState({
      supplierList:[]
    })
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
      filterCondition: this.filterCondition,
      token,
      requestType: 'SUPPLIER_SEARCH_IN_MOBILE'
    }).then((res) => {
      if(res.return_code == '0' && res.return_message == "Success"){
        this.setState({
          remoteData: res.result[0],
          supplierList:[ ...this.state.supplierList, ...res.result[0].supplierList ]
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

    this.setState({
      supplierList:[]
    })

    this.filterCondition = params

    this.getRemoteData()

    // console.log('_onUpdateFilter', params)
  }

  _renderItem = ({item}) => (
    <Item
      arrow="horizontal"
      align="middle"
      multipleLine
      // extra={<Button size="small">查看详情</Button>}
      onClick={()=>this.props.navigation.navigate('SupplierDetail', {supplierEntId:item.supplierEntId})}
      style={{marginBottom:10,borderRadius:5}}
    >
      <View style={{height:30, paddingTop:10, marginLeft:5}}>
        <Text numberOfLines={1} style={{color:'#65a8e1', fontSize:16}}>{item.supplierEntName}</Text>
      </View>
      <View style={{height:50, marginLeft:5}}>

        <Text numberOfLines={1} style={{color:'#a1a1a1',paddingTop:5}}>主营产品: {item.businessScope}</Text>
        <Text style={{color:'#a1a1a1',paddingTop:5}}>上次参与项目时间: {item.lastActiveDate}</Text>

        <WhiteSpace />
        <WhiteSpace />
      </View>
    </Item>
  )

  _fetchMoreData= () => {        

    this.filterCondition.pageNumber++
    this.getRemoteData()
  }

  _renderHeader = () => {
    let supplierCount = 0
    let activeSupplierCount = 0

    return(
      this.state.remoteData.hasStatGroupByEnt ?
        <Accordion style={{marginBottom:10, backgroundColor:'#fff', borderRadius:5}}>
          <Accordion.Panel header={
            <Flex style={{paddingTop:10, paddingBottom:10}}>
              <Flex.Item>
                <Text style={{color:'#a1a1a1',paddingTop:5}}>
                  供应商总数量: <Text style={{color: 'red'}}>{this.state.remoteData.supplierCount}</Text>
                </Text>
                
              </Flex.Item>
              <Flex.Item>
                <Text style={{color:'#a1a1a1',paddingTop:5}}>
                  近三个月活跃数量: <Text style={{color: 'green'}}>{this.state.remoteData.ActiveSupplierCount}</Text>
                </Text>
                
              </Flex.Item>
            </Flex>
          }>
            <List>
              <List.Item>
                  <Flex>
                  <Flex.Item><Text>企业名称</Text></Flex.Item>           
                  <Flex.Item><Text>供应商总数</Text></Flex.Item>           
                  <Flex.Item><Text>近三月活跃数量</Text></Flex.Item>           
                  </Flex>
              </List.Item>
              {this.state.remoteData.supplierStatByEnt &&
                this.state.remoteData.supplierStatByEnt.map((item, key)=>{
                  supplierCount+= item.supplierCount
                  activeSupplierCount+= item.activeSupplierCount
                  return (
                    <List.Item key={key}>
                      <Flex>
                        <Flex.Item><Text>{item.entName}</Text></Flex.Item>           
                        <Flex.Item><Text>{item.supplierCount}</Text></Flex.Item>           
                        <Flex.Item><Text>{item.activeSupplierCount}</Text></Flex.Item> 
                      </Flex>
                    </List.Item>
                  )
                })
              }
              <List.Item>
                  <Flex>
                  <Flex.Item><Text>总计</Text></Flex.Item>           
                  <Flex.Item><Text>{supplierCount}</Text></Flex.Item>           
                  <Flex.Item><Text>{activeSupplierCount}</Text></Flex.Item>           
                  </Flex>
              </List.Item>
              
            </List>
          </Accordion.Panel>
        </Accordion>
        :
        <Flex style={{paddingTop:10, paddingBottom:10, marginBottom:10, backgroundColor:'#fff', borderRadius:5}}>
          <Flex.Item>
            <Text style={{color:'#a1a1a1',paddingTop:5, paddingLeft:10}}>
              供应商总数量: <Text style={{color: 'red'}}>{this.state.remoteData.supplierCount}</Text>
            </Text>
            
          </Flex.Item>
          <Flex.Item>
            <Text style={{color:'#a1a1a1',paddingTop:5}}>
              近三个月活跃数量: <Text style={{color: 'green'}}>{this.state.remoteData.ActiveSupplierCount}</Text>
            </Text>
            
          </Flex.Item>
        </Flex>
        
    )
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

  render() {
    
    if(this.state.renderView === true){
      return (
        <WingBlank size="sm" style={{marginBottom:85}}>
        
        <FiltersSection onUpdateFilter={this._onUpdateFilter} />
        <WhiteSpace />
        <FlatList
          data={this.state.supplierList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={true}
          // scrollToEnd={()=>console.log('我是有底线的')}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
        />
      </WingBlank>
      );
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
  backgroundColorWhite:{
    backgroundColor:'#fff'
  }
    
})