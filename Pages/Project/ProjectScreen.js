/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Flex, WingBlank, List, WhiteSpace, Button, Toast} from 'antd-mobile'
import FiltersSection from './FiltersSection'
import Ionicons from '../../Components/Ionicons';

// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

const Item = List.Item;
const Brief = Item.Brief;

export default class ProjectsScreen extends React.Component {

  constructor(props) {
    super(props);
    // 基本属性
    this.chooseCate = 3;
    this.dateFrom = '2017-1-7'
    this.dateTo = '2018-2-6'
    this.locationId = null
    this.filterCondition = {
      // mainCateId: this.chooseCate,
      // recentBeginDate : this.dateFrom,
      // recentEndDate : this.dateTo,
      // location:this.locationId,
      cateId:null,
      piStatus:'进行中',
      piType:2,
      pbBeginDate:'2017-1',
      pbEndDate:'2018-3',
      pageSize:100,
      pageNumber:1
    }

    this.token = null

    this.state = {
      remoteData:[],
      piStatus:'进行中',
      piType:2,
      searchKey:''
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
      filterCondition: this.filterCondition,
      token,
      useNew : 'true',
      requestType: 'PURCHASE_ITEM_LIST'
    }).then((res) => {
      if(res.return_code == '0' && res.return_message == "Success"){
        this.setState({
          remoteData: res.result[0]
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

  _renderItem = ({item}) => (
      <Item
          arrow="horizontal"
          // extra={<Text>{item.pitStatus}</Text>}
          align="middle"
          thumb={<Ionicons name={item.piType == '比价' ? 'project-compare' : item.piType == '招标' ? 'project-invite' : 'project-agreement'} size={35} />}
          multipleLine
          onClick={()=>this.props.navigation.navigate('ProjectDetail', {piId:item.piId})}
          style={{marginBottom:10,borderRadius:5}}
        >
          <View style={{height:30, paddingTop:10, marginLeft:5}}>
            <Flex>
              <Flex.Item style={{flex:3}}>
                <Text numberOfLines={1} style={{color:'#65a8e1', fontSize:16}}>{item.piTitle}</Text>
              </Flex.Item>
              <Flex.Item>
                <Button size="small" style={{borderColor:(item.pitStatus == '进行中' ? '#e7a253' : '#777')}}>
                  <Text style={{color:(item.pitStatus == '进行中' ? '#e7a253' : '#777')}}>{item.pitStatus}</Text>
                </Button>
              </Flex.Item>
            </Flex>
            
          </View>
          <View style={{height:50, marginLeft:5}}>
            <WhiteSpace />
            <WhiteSpace />
            {/* <Brief style={{fontSize:13}}>
              {item.entName} {item.cutoffTimeStr.substring(0,10)}
            </Brief> */}
            <Flex>
              <Flex.Item style={{flex:7}}>
                <Text numberOfLines={1} style={{color:'#a1a1a1'}}>{item.entName}</Text>
              </Flex.Item>
              <Flex.Item style={{flex:3}}>
                <Text style={{color:'#a1a1a1'}}>{item.cutoffTimeStr.substring(0,10)}</Text>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <WhiteSpace />
          </View>
      </Item>
  )

  render() {
    return (
      <WingBlank size="sm">
        
        <FiltersSection onUpdateFilter={this._onUpdateFilter} />
        <WhiteSpace />
        <FlatList
          data={this.state.remoteData.list}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          refreshing={true}
          scrollToEnd={()=>console.log('我是有底线的')}
        />
      </WingBlank>
    );
  }
}