/**
 * 20180317
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Accordion, List, Drawer, Button, Flex, WingBlank, WhiteSpace, Card } from 'antd-mobile';
import Ionicons from '../../Components/Ionicons';

const myImg = src => {
  const imgString = `https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`
  return <Image source={{uri:imgString}} />
};
// Services
import {getRemoteData}  from '../../Services/CommonService.js'

var ls = require('react-native-local-storage');

export default class ProjectDetailScreen extends React.Component {

  static navigationOptions = {
    title: '项目详情',
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
    this.piId = props.navigation.state.params.piId
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
    getRemoteData({
      piId: this.piId,
      token,
      requestType: 'PURCHASE_ITEM_DETAIL'
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

    // const sidebar = (<List>
    //   {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
    //     if (index === 0) {
    //       return (<List.Item key={index}
    //         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //         multipleLine
    //       >Category</List.Item>);
    //     }
    //     return (<List.Item key={index}
    //       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //     >Category{index}</List.Item>);
    //   })}
    // </List>);


    return (
      <ScrollView>
        
        <View style={styles.backgroundColorWhite}>
          <Flex style={{padding:15}}>
            <Flex.Item flex={1}>
              <Ionicons style={{padding:0,margin:0}} name={'item-detail-title'} size={15} color={'#58b6ef'} />
            </Flex.Item>
            <Flex.Item flex={3}>
              <Text style={styles.title}>项目名称:</Text>
            </Flex.Item>
            <Flex.Item flex={9}>
              <Text style={styles.text}>{this.state.remoteData.piTitle}</Text>
            </Flex.Item>
          </Flex>

          <Flex style={{padding:15,paddingTop:0}}>
          <Flex.Item flex={1}>
            <Ionicons style={{padding:0,margin:0}} name={'item-detail-ent'} size={15} color={'#58b6ef'} />
          </Flex.Item>
          <Flex.Item flex={3}>
            <Text style={styles.title}>采购企业:</Text>
          </Flex.Item>
          <Flex.Item flex={9}>
            <Text style={styles.text}>{this.state.remoteData.piEnt}</Text>
          </Flex.Item>
          </Flex>
        </View>

        <WhiteSpace />

        
        <Accordion defaultActiveKey="0" style={styles.backgroundColorWhite}>
          <Accordion.Panel header={this._renderAccordionHeader('采购产品')} >
            {this.state.remoteData.products &&
            <List>
              {this.state.remoteData.products.map((item, key)=>{
                return (
                  
                    <List.Item key={key}>
                      <Flex>
                        <Flex.Item flex={1}>
                          <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                        </Flex.Item>
                        <Flex.Item flex={3}>
                          <Text style={styles.text}>{item.name}</Text>
                        </Flex.Item>
                        <Flex.Item flex={4}>
                          <Text style={{textAlign:'center', color: '#959595'}}>{item.special}</Text>
                        </Flex.Item>
                        <Flex.Item flex={4}>
                          <Text style={{textAlign:'right', color: '#959595'}}>{item.quantityStr}</Text>
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
          <Accordion.Panel header={this._renderAccordionHeader('采购详情')}>
          {this.state.remoteData.products &&
            <List>
              <List.Item>
                <Flex>
                  <Flex.Item flex={1}>
                    <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                  </Flex.Item>
                  <Flex.Item flex={3}>
                    <Text style={styles.text}>报价类型:</Text>
                  </Flex.Item>
                  <Flex.Item flex={8}>
                    <Text style={styles.text}>{this.state.remoteData.quoteType}</Text>
                  </Flex.Item>
                </Flex>
              </List.Item>
              <List.Item>
                <Flex>
                  <Flex.Item flex={1}>
                    <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                  </Flex.Item>
                  <Flex.Item flex={3}>
                    <Text style={styles.text}>付款周期:</Text>
                  </Flex.Item>
                  <Flex.Item flex={8}>
                    <Text style={styles.text}>{this.state.remoteData.paymentCycle}</Text>
                  </Flex.Item>
                </Flex>
              </List.Item>
              <List.Item>
                <Flex>
                  <Flex.Item flex={1}>
                    <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                  </Flex.Item>
                  <Flex.Item flex={3}>
                    <Text style={styles.text}>送货地址:</Text>
                  </Flex.Item>
                  <Flex.Item flex={8}>
                    <Text style={styles.text}>{this.state.remoteData.deliverAddress}</Text>
                  </Flex.Item>
                </Flex>
              </List.Item>
            </List>
            }
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace />

        <Accordion style={styles.backgroundColorWhite}>
          <Accordion.Panel header={this._renderAccordionHeader('供应商')}>
          {this.state.remoteData.selectedSupplier &&
            <List>
              {this.state.remoteData.selectedSupplier.map((item, key)=>{
                return (
                  
                    <List.Item key={key}>
                      <Flex>
                        <Flex.Item flex={1}>
                          <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                        </Flex.Item>
                        <Flex.Item flex={9}>
                          <Text style={styles.text}>{item.supplierEntName}</Text>
                        </Flex.Item>
                        <Flex.Item flex={2}>
                          <Text style={{textAlign:'right', color: '#959595'}}>{item.supplierJoinTypeStr}</Text>
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
        
        
          <Accordion style={styles.backgroundColorWhite}>
            <Accordion.Panel header={this._renderAccordionHeader('报价')}>
            
            {this.state.remoteData.supplierQuoteResult &&
            <List>
              {this.state.remoteData.supplierQuoteResult.map((item, key)=>{
                return (
                  <View key={key}>
                    <List.Item>
                      <Flex>
                        <Flex.Item flex={1}>
                          <Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />
                        </Flex.Item>
                        <Flex.Item flex={11}>
                          <Text style={styles.text}>{item.supplierEntName}</Text>
                        </Flex.Item>
                      </Flex>
                    </List.Item>
                    <List.Item wrap>
                      <Text style={{paddingLeft:30, color:'#959595'}}>产品名称 ： {item.productName}</Text>
                      <Text style={{paddingLeft:30, color:'#959595'}}>产品规格 ： {item.productSpec}</Text>
                      <Text style={{paddingLeft:30, color:'#959595'}}>产品价格 ： {item.refPriceStr}</Text>
                    </List.Item>
                  </View>
                )
              })}
            </List>
            }
                 
                
            </Accordion.Panel>
          </Accordion>
          <WhiteSpace />
        
        {/* {this.state.remoteData.supplierQuoteResult && <WhiteSpace />} */}

        <Accordion style={styles.backgroundColorWhite}>
          <Accordion.Panel header={this._renderAccordionHeader('结果')}>
            {this.state.remoteData.arResult &&
            <List>
              {this.state.remoteData.arResult.map((item, key)=>{
                return (
                  <Card full key={key}>
                    <Card.Header
                        title={<Text style={{paddingLeft:5, color:'#959595'}}>{item.supplierEntName}</Text>}
                        thumb={<Ionicons style={{padding:0,margin:0}} name={'item-detail-list-icon'} size={10} color={'#58b6ef'} />}
                        // extra={<span>{item.productName}</span>}
                    />
                    <Card.Body>
                        <View><Text style={{paddingLeft:30, color:'#959595'}}>产品名称 ： {item.productName}</Text></View>
                        <View><Text style={{paddingLeft:30, color:'#959595'}}>产品规格 ： {item.productSpec}</Text></View>
                        <View><Text style={{paddingLeft:30, color:'#959595'}}>采购数量 ： {item.productQuantityStr}</Text></View>
                        <View><Text style={{paddingLeft:30, color:'#959595'}}>产品价格 ： {item.refPriceStr}</Text></View>
                        <View><Text style={{paddingLeft:30, color:'#959595'}}>分配数量 ： {item.allocationQuantityStr}</Text></View>
                        <View><Text style={{paddingLeft:30, color:'#959595'}}>分配比率 ： {item.allocationRatioStr}</Text></View>
                    </Card.Body>
                    {/* <Card.Footer content="价格" extra={item.refPriceStr} /> */}
                  </Card>
                )
              })}
            </List>
            }
          
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace size="lg" />
       

      
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