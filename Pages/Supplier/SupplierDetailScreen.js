/**
 * 20180317
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Accordion, List, Drawer, Button, Flex, WingBlank, WhiteSpace, Card, Toast } from 'antd-mobile';
import Ionicons from '../../Components/Ionicons';
import MyTable from '../../Components/MyTable'
// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

export default class SupplierDetailScreen extends React.Component {

  static navigationOptions = {
    title: '供应商详情',
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
    this.entId = props.navigation.state.params.supplierEntId
    this.state = {
      remoteData: []
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
    let params = {
      entId: this.entId,
      token,
      requestType: 'SUPPLIER_DETAIL_INFO_IN_MOBILE'
    }
    // console.log('params', params)
    getRemoteData(params).then((res) => {
      if(res.return_code == '0' && res.return_message == "Success"){
        this.setState({
          remoteData: res.result[0]
        })
        // console.log('remoteData', res.result)
      }else{
        // ls.remove('userInfo')
        Toast.fail(res.return_message, 2, ()=>{
          this.setState({
            remoteData:[]
          })
        });
      }
    })
  }

  onOpenChange = (...args) => {
    console.log(args);
    // this.setState({ open: !this.state.open });
  }

  _renderAccordionHeader = (name) => {

    return (
      <Flex>
        <Flex.Item>
          <Text style={{color:'#1aa6eb', textAlign:'center', padding:15}}>{name}</Text>
        </Flex.Item>
      </Flex>
    )
  }

  render() {

    console.log('remoteData', this.state.remoteData)

    const columns = [{
        title: '产品名称+规格',
        dataIndex: 'prodName',
        key: 'prodName',
    }, {
        title: '产品数量',
        dataIndex: 'purchaseQuantityStr',
        key: 'purchaseQuantityStr',
        // formatter: val => parseInt(val)
    }, {
        title: '报价',
        dataIndex: 'quotePriceStr',
        key: 'quotePriceStr',
    }, {
      title: '是否中标',
      dataIndex: 'bid',
      key: 'bid',
      formatter: val => val ? '是' : '否'
  }];

    return (
      <ScrollView>
        
        <View style={styles.backgroundColorWhite}>

          <Flex style={{padding:15}}>
            <Flex.Item flex={1}>
              <Ionicons style={{padding:0,margin:0}} name={'item-detail-ent'} size={15} color={'#58b6ef'} />
            </Flex.Item>
            <Flex.Item flex={3}>
              <Text style={styles.title}>供应商名:</Text>
            </Flex.Item>
            <Flex.Item flex={9}>
              <Text>{this.state.remoteData.supplierEntName}</Text>
            </Flex.Item>
          </Flex>

          <Flex style={{padding:15,paddingTop:0}}>
            <Flex.Item flex={1}>
              <Ionicons style={{padding:0,margin:0}} name={'item-detail-title'} size={15} color={'#58b6ef'} />
            </Flex.Item>
            <Flex.Item flex={3}>
              <Text style={styles.title}>所属企业:</Text>
            </Flex.Item>
            <Flex.Item flex={9}>
              <Text style={styles.text}>{this.state.remoteData.belongEntNameStr}</Text>
            </Flex.Item>
          </Flex>

          <Flex style={{padding:15,paddingTop:0}}>
            <Flex.Item flex={1}>
              <Ionicons style={{padding:0,margin:0}} name={'item-detail-title'} size={15} color={'#58b6ef'} />
            </Flex.Item>
            <Flex.Item flex={3}>
              <Text style={styles.title}>地区:</Text>
            </Flex.Item>
            <Flex.Item flex={9}>
              <Text style={styles.text}>{this.state.remoteData.areaDisplay}</Text>
            </Flex.Item>
          </Flex>

          <Flex style={{padding:15,paddingTop:0}}>
            <Flex.Item flex={1}>
              <Ionicons style={{padding:0,margin:0}} name={'item-detail-title'} size={15} color={'#58b6ef'} />
            </Flex.Item>
            <Flex.Item flex={3}>
              <Text style={styles.title}>主营产品:</Text>
            </Flex.Item>
            <Flex.Item flex={9}>
              <Text style={styles.text}>{this.state.remoteData.businessScope}</Text>
            </Flex.Item>
          </Flex>

          <Flex style={{padding:15,paddingTop:0}}>
            <Flex.Item flex={1}>
              <Ionicons style={{padding:0,margin:0}} name={'item-detail-title'} size={15} color={'#58b6ef'} />
            </Flex.Item>
            <Flex.Item flex={3}>
              <Text style={styles.title}>信用证号:</Text>
            </Flex.Item>
            <Flex.Item flex={9}>
              <Text style={styles.text}>{this.state.remoteData.unifiedCode}</Text>
            </Flex.Item>
          </Flex>

        </View>

        <WhiteSpace />

        
        <Accordion defaultActiveKey="0" style={styles.backgroundColorWhite}>
          <Accordion.Panel header={this._renderAccordionHeader('联系人列表')} >
            {this.state.remoteData.contacts &&
            <List>
              {this.state.remoteData.contacts.map((item, key)=>{
                return (
                  
                    <List.Item key={key}>
                      <Flex>
                        <Flex.Item flex={1}>
                          <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                        </Flex.Item>
                        <Flex.Item flex={3}>
                          <Text style={styles.text}>{item.username}</Text>
                        </Flex.Item>
                        <Flex.Item flex={4}>
                          <Text style={{textAlign:'center', color: '#959595'}}>{item.mobile}</Text>
                        </Flex.Item>
                        <Flex.Item flex={4}>
                          <Text style={{textAlign:'right', color: '#959595'}}>{item.purchaseRemark}</Text>
                        </Flex.Item>
                      </Flex>
                    </List.Item>
                  
                )
              })}
            </List>
            }
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace />
        
        <Accordion defaultActiveKey="0" style={styles.backgroundColorWhite}>
          <Accordion.Panel header={this._renderAccordionHeader('参与项目列表')}>
          
          {this.state.remoteData.piList &&
          <List>
            {this.state.remoteData.piList.map((item, key)=>{
              return (
                <View key={key}>
                  <List.Item>
                    <Flex>
                      <Flex.Item flex={1}>
                        <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                      </Flex.Item>
                      <Flex.Item flex={11}>
                        <Text style={styles.text}>{item.piTitle}</Text>
                      </Flex.Item>
                    </Flex>
                  </List.Item>
                  <List.Item wrap>
                    <Text style={{paddingLeft:30, color:'#959595'}}>采购企业 ： {item.purchaseEntName}</Text>
                    <Text style={{paddingLeft:30, color:'#959595'}}>项目类型 ： {item.piType}</Text>
                    <Text style={{paddingLeft:30, color:'#959595'}}>项目地区 ： {item.piArea}</Text>
                    <Text style={{paddingLeft:30, color:'#959595'}}>发布时间 ： {item.publishTimeStr}</Text>
                    {/* <Text style={{paddingLeft:30, color:'#959595'}}>报价列表 ：</Text> */}

                    <View style={{height:item.quoteList.length*50+100}}>
                      <MyTable
                        header="报价列表"
                        height={item.quoteList.length*50}
                        dataSource={item.quoteList}
                        columns={columns}
                      />
                    </View>

                  </List.Item>
                </View>
              )
            })}
          </List>
          }
                
              
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace />
        
        
       

      
      {/* <Drawer
        // style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        <Button onClick={()=>this.setState({ open: !this.state.open })}>Click upper-left corner</Button>
      </Drawer> */}


      </ScrollView>
    );
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