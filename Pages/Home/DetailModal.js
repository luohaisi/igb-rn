/**
 * 20180117
 * @author luohaisi
 */
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Flex, WhiteSpace, WingBlank, Modal, ActivityIndicator } from 'antd-mobile'
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
            remoteData:[]
        }
    }


    componentWillMount(){

        getRemoteData(this.props.params).then(
            response => {
                if(response.return_code == 0) {
                    response.result && this.setState({
                        remoteData: response.result
                    })
                } else {
                    // console.log('HomeModalPage:response', response)
                }
            }, (err) => {
                // console.log('HomeModalPage:response', err)
            }
        )
    }

    toFixNumber = (number) => {
        return (number*100).toFixed(2) + '%';
    }

    render(){
        return (
            <ScrollView style={{height:'100%'}}>
                <Flex >
                    <Flex.Item style={{alignItems:'center', height:30,marginTop:20}}>
                        <Text style={{color:'#f2f2f2',fontSize:18,fontWeight:'bold'}}>{this.props.cateId == 3 ? '上海地区':''}{cateNameObj[this.props.cateId]}价格对比详情</Text>
                    </Flex.Item>
                </Flex >
                {this.state.remoteData.length > 0 
                ?
                    this.state.remoteData.map((item,key) => {
                        return (
                                <Card key={key} style={{marginBottom:20}}>
                                    <Card.Header
                                        title={<Text style={{color:'#50a9e6',fontSize:15}}>{item.piTitle}</Text>}
                                    />
                                    <Card.Body>

                                        <Flex style={{marginLeft:10}}>
                                            <Flex.Item>
                                                <Text style={style.fontsize12}>{this.props.params.filterCondition.mainCateId == 3 ? '市场均价': '企业均价'} ：{item.avgPriceStr}</Text>
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
                        )
                    })
                :
                    <ActivityIndicator />
                }
                
            </ScrollView>
        )
    }
 } 

 const style = {
    fontsize12:{
        fontSize:12
    }
 }