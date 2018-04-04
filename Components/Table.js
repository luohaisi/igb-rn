/**
 * 20180323
 * @author luohaisi
 */
import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Flex, List } from 'antd-mobile';

export default class Table extends React.Component {

  constructor(props){
    super(props)
    this.columns    = props.columns
    this.header     = props.header
    this.footer     = props.footer
    this.height     = props.height ? {height:props.height, paddingLeft:0} : {height:220, paddingLeft:0} 
    this.tableBordered= props.tableBorderFree ? null :'ant-table-bordered'
    this.blueHead  = props.isBlueHead ? styles.blueHead : styles.darkHead
  }

    

  _renderHeader = () => {
      return(
        <Flex style={styles.tHeadRowStyle}>
          {this.columns.map((item, key) => {
            return (
              <Flex.Item key={key} style={styles.tHeadColumnStyle}>
                <Text>{item.title}</Text>
              </Flex.Item>
            )
          })}
        </Flex>
      )
  }

  _renderItem = ({item}) => (
    <Flex >
      {this.columns.map((item2, key2) => {
        return (
          <Flex.Item key={key2} style={styles.columnStyle}>
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
)

  render() {

    return (
          <FlatList
              data={this.props.dataSource}
              ListHeaderComponent={this._renderHeader}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
          />
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
    // backgroundColor:'#f2f2f2'
  },
  tHeadRowStyle:{
    // backgroundColor:'#3789de',
    
  },
  tHeadColumnStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:39,
    // borderWidth:1,
    // borderColor:'#f2f2f2'
  },

  columnStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:39,
    // borderWidth:1,
    // borderColor:'#f2f2f2'
  }
}