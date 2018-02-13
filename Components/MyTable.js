/**
 * 20180207
 * @author luohaisi
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Flex, List } from 'antd-mobile';

export default class MyTable extends React.Component {

  constructor(props){
    super(props)
    this.columns    = props.columns
    this.header     = props.header
    this.footer     = props.footer
    this.height     = props.height ? {height:props.height, paddingLeft:0} : {height:220, paddingLeft:0} 
    this.tableBordered= props.tableBorderFree ? null :'ant-table-bordered'
    this.blueHead  = props.isBlueHead ? styles.blueHead : styles.darkHead
  }
  render() {
    return (
      <ScrollView style={this.height}>
      <Card full style={{borderWidth:0}}>
        <Card.Header
            title={<Text style={{fontSize:15,textAlign:'center'}}>{this.header}</Text>}
            style={{backgroundColor:'#FFFFFF',marginLeft:0,alignItems:'center',display:this.header?'flex':'none'}}
        />
        <Card.Body>
          <List.Item style={this.blueHead}>
            <Flex style={{alignItems:'flex-start'}}>
              {this.columns.map((item, key) => {
                return (
                  <Flex.Item key={key}>
                    <Text>{item.title}</Text>
                  </Flex.Item>
                )
              })}
            </Flex>
          </List.Item>
          {this.props.dataSource.map((item, key) => {
            // console.log('table.item', item)
            return (
              <List.Item key={key}  style={{marginLeft:0,paddingLeft:0}}>
                <Flex style={{alignItems:'flex-start'}}>
                  {this.columns.map((item2, key2) => {
                    return (
                      <Flex.Item key={key2}>
                        <Text>
                        {item2.formatter 
                        ? 
                            item2.formatter(item[item2.key])
                        :
                            item[item2.key]
                        }
                        </Text>
                      </Flex.Item>
                    )
                  })}
                </Flex>
              </List.Item>
            )
            })}
        </Card.Body>
      </Card>
      </ScrollView>
    );
  }
}


const styles = {
  blueHead:{
    marginLeft:1,
    paddingLeft:0,
    backgroundColor:'#3789de',
    borderColor:'#3789de',
    borderWidth:1,
    borderRadius:5
  },
  darkHead:{
    backgroundColor:'#f2f2f2'
  }
}