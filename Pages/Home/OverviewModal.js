/**
 * 20180117
 * @author luohaisi
 */
import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {Flex, WhiteSpace, WingBlank, List} from 'antd-mobile'

// Services
var {getRemoteData} = require('../../Services/CommonService.js')

import Table from '../../Components/Table'

 export default class OverviewModal extends React.Component {

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
                        remoteData: response.result[0]
                    })
                    // console.log('OverviewModal:response', response.result[0])
                } else {
                    console.log('OverviewModal:response', response)
                }
            }, (err) => {
                console.log('OverviewModal:response', err)
            }
        )
    }

    render(){
        const { remoteData } = this.state;
    if (!remoteData) {
        return (
            <Text>数据加载中...</Text>
        );
    }

        const columns = [{
            title: '企业简称',
            dataIndex: 'entName',
            key: 'entName',
          }, {
            title: '项目总数',
            dataIndex: 'piCount',
            key: 'piCount',
          }, {
            title: '全邀请数',
            dataIndex: 'allInvitedPiCount',
            key: 'allInvitedPiCount',
          }, {
            title: '公开市场参与',
            dataIndex: 'marketQuotePiCount',
            key: 'marketQuotePiCount',
          }];
        return (
          <ScrollView style={{backgroundColor:'#fff'}}>
            {/* <WingBlank size="sm"> */}

            <Text style={{textAlign: 'center'}}>总览详情</Text>
            <WhiteSpace />

            <View style={styles.pannel}>
                <Text style={styles.pannelHeader}>项目类型</Text>
                <Flex justify="center" align="center">
                    <Flex.Item style={styles.flexItemStyle}>
                        <Text>比价：<Text style={{color:'#00a0e9'}}>{this.state.remoteData.comparePiCount}</Text></Text>
                    </Flex.Item>
                    <Flex.Item style={styles.flexItemStyle}>
                        <Text>招标：<Text style={{color:'#00a0e9'}}>{this.state.remoteData.tenderPiCount}</Text></Text>
                    </Flex.Item>
                    <Flex.Item style={styles.flexItemStyle}>
                        <Text>协议：<Text style={{color:'#00a0e9'}}>{this.state.remoteData.agreementPiCount}</Text></Text>
                    </Flex.Item>
                </Flex>
            </View>

            <View style={styles.pannel}>
                <Text style={styles.pannelHeader}>项目类型</Text>
                <Flex>
                    <Flex.Item style={styles.flexItemStyle}>
                        <Text>全邀请报价：<Text style={{color:'#00a0e9'}}>{this.state.remoteData.allInvitedPiCount}</Text></Text>
                    </Flex.Item>
                    <Flex.Item style={styles.flexItemStyle}>
                        <Text>公开市场参与：<Text style={{color:'#00a0e9'}}>{this.state.remoteData.marketQuotePiCount}</Text></Text>
                    </Flex.Item>
                </Flex>
            </View>

            <WhiteSpace size="lg" />

            <WhiteSpace />
            {this.state.remoteData.piStatGroupByEnt 
            ?
              <View>
                <Flex >
                    <Flex.Item style={{alignItems:'center', height:30,marginTop:20}}>
                    <Text style={{fontSize:15,textAlign:'center'}}>子集团各企业邀请与公开采购项目汇总表</Text>
                    </Flex.Item>
                </Flex>
                <Table 
                    header="子集团各企业邀请与公开采购项目汇总表"
                    height={360}
                    dataSource={this.state.remoteData.piStatGroupByEnt}
                    columns={columns}
                    tableBorderFree
                    isBlueHead
                    />
              </View>
            :
                null
            }
                
            {/* </WingBlank> */}
          </ScrollView>
        )
    }

 } 

 const styles = StyleSheet.create({
    flexItemStyle: {
        alignItems:'center',
        height:30,
        paddingTop:5
        // color:'#333'
    },
    pannel:{
        borderColor:'#f2f5fe',
        borderWidth:1,
        borderRadius:4
    },
    pannelHeader:{
        backgroundColor:'#f2f5fe',
        margin:0,height:30,
        lineHeight:30,
        // alignSelf:'center',
        textAlign:'center',
        alignItems:'center'
    }
 })