/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WhiteSpace, Flex, Tabs } from 'antd-mobile';

export default class CateStatSection extends React.Component {
    render() {
      const tabs = [
        { title: '螺纹钢', cateId: 3 },
        { title: '混凝土', cateId: 1  },
        { title: '水泥', cateId: 2 },
      ];
      const data = this.props.dataSource
      return (
        <View style={styles.container}>
          <Flex>
            <Tabs 
                initialPage={0}
                tabs={tabs} 
                onTabClick={this.props.onTabClick}
                animated={false}
            >
                {/* tab 内容 */}
            </Tabs>
          </Flex>

        <Flex>
          <Flex.Item>
            <Text style={styles.flexItem}>集团均价:</Text>
            <Text style={styles.flexItem}>{data.groupAvgPriceStr}</Text>
          </Flex.Item>

          {this.props.entId  != 6 ?
            <Flex.Item>
              <Text style={styles.flexItem}>{this.props.entShortName}均价:</Text>
              <Text style={styles.flexItem}>{data.entAvgPriceStr}</Text>
            </Flex.Item>
            :
            null
          }

          <Flex.Item>
            <Text style={styles.flexItem}>市场均价:</Text>
            <Text style={styles.flexItem}>{data.marketAvgPriceStr}</Text>
          </Flex.Item>
        </Flex>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      backgroundColor:'#ffffff',
      paddingLeft:10,
      paddingRight:10,
      borderTopLeftRadius:10,
      borderTopRightRadius:10
    },
    flexItem:{
      height:25,
      lineHeight:25,
      overflow:'visible'
    }
      
  })