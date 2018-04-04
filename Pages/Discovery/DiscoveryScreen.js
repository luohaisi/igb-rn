/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, WebView, Image } from 'react-native';
import { WingBlank, WhiteSpace, Grid, ActivityIndicator, Flex, List, FlatList, Toast, Button } from 'antd-mobile'
import Ionicons from '../../Components/Ionicons';
import FiltersSection from '../Project/FiltersSection'
// Services
import {getRemoteData}  from '../../Services/CommonService.js'
var ls = require('react-native-local-storage');

import {
  DiscoveryLineChart
} from '../../Conf/HtmlChart'

import {
  getIconName
} from '../../Utils/functions'

const data = [
  {
    icon: 'road-bridge',
    text: '道路桥梁',
  },
  {
    icon: 'under-engineer',
    text: '地下工程',
  },
  {
    icon: 'sponge-city',
    text: '海绵城市',
  },
  {
    icon: 'health-building',
    text: '健康建筑',
  },
  {
    icon: 'green-building',
    text: '绿色建筑',
  },
  {
    icon: 'green-produce',
    text: '绿色生产',
  },
  {
    icon: 'clean-energy',
    text: '清洁能源',
  },
  
]

const newList = [
  {
    id:1,
    title:'生态双废透水混凝土',
    cover:'http://mpur.igreenbuy.com/static/media/stsftshnt.612fbef8.jpg',
    typeName:'绿色建筑',
    location:'上海',
    materials:'材料',
    createTime:'2017-11-20'
  },
  {
    id:1,
    title:'钢渣透水混凝土',
    cover:'http://mpur.igreenbuy.com/static/media/gztshnt.61d3ea79.jpg',
    typeName:'海绵城市',
    location:'上海',
    materials:'材料',
    createTime:'2017-11-20'
  },
  {
    id:1,
    title:'透光混凝土',
    cover:'http://mpur.igreenbuy.com/static/media/stsftshnt.612fbef8.jpg',
    typeName:'绿色建筑',
    location:'上海',
    materials:'材料',
    createTime:'2017-11-20'
  },
  {
    id:1,
    title:'UHPC',
    cover:'http://mpur.igreenbuy.com/static/media/uhpc.b98f2758.jpg',
    typeName:'道路桥梁',
    location:'上海',
    materials:'材料',
    createTime:'2017-11-20'
  }
]

export default class DiscoveryScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      remoteData:[],
      renderView:false
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
      enddate:'201802',
      startdate:'201701',
      pc_type:'PC预制外墙板',
      spec:"清水",
      token,
      requestType: 'FETCH_PC_PRICE_LIST'
    }).then((res) => {
      if(res.return_code == '0' && res.return_message == "Success"){
        this.setState({
          remoteData: res.result[0],
          renderView:true
        })
        // console.log('remoteData', res.result[0])
      }else{
        console.log('FETCH_PC_PRICE_LIST:fail', res)
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

    // this.getRemoteData()

    console.log('_onUpdateFilter', params)
  }

  render() {

    if(this.state.renderView === true){

      const list = JSON.stringify(this.state.remoteData.list)

      const htmlPCByType = DiscoveryLineChart(list)

      return (
        <ScrollView>
          <WingBlank size="sm" style={{backgroundColor:'#FFF'}}>
            <Grid 
              data={data} 
              // itemStyle={{ height: 150, backgroundColor: 'rgba(0,0,0,.05)' }}
              hasLine={false}
              renderItem={dataItem => (
                <Flex 
                  direction="column" 
                >
                  <View>
                    <WhiteSpace />
                    <Ionicons name={dataItem.icon} size={40} color={'#58b6ef'} />
                  </View>
                  <View>
                    <WhiteSpace />
                    <Text style={{color:'#65a8e1'}}>{dataItem.text}</Text>
                  </View>
                </Flex>
                
              )}
            />

            <FiltersSection 
              onUpdateFilter={this._onUpdateFilter} 
              showSearchbar={false}
              showFilterList={[4,5]}
            />
            <WhiteSpace />

            <List.Item 
                style={styles.listHeader}
              >
              <Text style={styles.listHeaderText}>{this.state.remoteData.pc_type}</Text>
            </List.Item>
            <List.Item multipleLine>
                <WebView
                  source={{html: htmlPCByType}}
                  style={{height:200,paddingBottom:0}}
                  renderLoading={()=>{return (<ActivityIndicator toast text="正在加载" />)}}
                />
            </List.Item>

          </WingBlank>
          <WhiteSpace />
          

          <WingBlank size="sm">
            {newList.map((item, key) => {

              return(
                <List.Item 
                  style={{height:150, marginBottom:10}}
                  thumb={<Image style={{width: 100, height: 100}} source={{uri: item.cover}} />}
                  // arrow="horizontal"
                  onClick={()=>this.props.navigation.navigate('DiscoveryDetai',{articleId:key})}
                  key={key}
                >
                  <View style={{height:60, padding:10, paddingTop:20}}>
                    <Flex>
                      <Flex.Item >
                        <Text numberOfLines={1} style={{color:'#65a8e1', fontSize:18}}>{item.title}</Text>
                      </Flex.Item>
                    </Flex>
                    
                  </View>

                  <View style={{height:90, padding:10, paddingBottom:50}}>
             
                    <Flex direction="column" align="start" justify="start">
                    
                        <Text numberOfLines={1} style={{color:'#a1a1a1', height:40}}>
                          <Ionicons name={getIconName(item.typeName)} size={15} /> {item.typeName}
                        </Text>
                   
                        <Text style={{height:40}}>
                          <Ionicons name={'location-icon'} size={15} /> {item.location} &nbsp;
                          <Ionicons name={'material-icon'} size={15} /> {item.materials}  &nbsp;
                          <Ionicons name={'time-icon'} size={15} /> {item.createTime}
                        </Text>
                    </Flex>
                    <WhiteSpace />
                    <WhiteSpace />
                  </View>
                </List.Item>
              )
            })}
          </WingBlank>

        </ScrollView>
        )
    }else{
      return <ActivityIndicator toast text="正在加载" />
      // return <Button onClick={()=>this.props.navigation.navigate('DiscoveryDetai')}>detail</Button>
    }
    
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