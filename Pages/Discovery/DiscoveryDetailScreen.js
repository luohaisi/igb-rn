/**
 * 20180329
 * @author luohaisi
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, WebView, ImageBackground, Image } from 'react-native';
import { WingBlank, WhiteSpace, Grid, ActivityIndicator, Flex, List, FlatList, Toast } from 'antd-mobile'
import Ionicons from '../../Components/Ionicons';

import {
  getIconName
} from '../../Utils/functions'

import {
  newMaterialData
} from './mock'

const article = null

export default class DiscoveryDetailScreen extends React.Component {

  constructor(props){
    super(props)

    this.articleId = props.navigation.state.params.articleId
    article = newMaterialData[this.articleId]
  }

  static navigationOptions = {
    title: '新材料',
    headerStyle: {
      backgroundColor: '#117BE9',
    },
    headerTintColor: '#F2F2F2',
  };


  render(){

      return(
          <ScrollView>
            {/* 头部 */}
            <ImageBackground style={{height:220,width:'100%', opacity:0.8}} source={{uri:article.cover}} >
              <Flex direction="column" align="start" style={{height:220, paddingTop:80}}>
                  <View style={styles.headerRow}>
                      <Text style={styles.headerTitle}>{article.title}</Text>
                  </View>
                  <View style={styles.headerRow}>
                      <Text style={styles.headerText}>
                      <Ionicons name={getIconName(article.typeName)} size={15} />  {article.typeName}
                      </Text>
                  </View>
                  <View style={styles.headerRow}>
                      <Text style={styles.headerText}>
                        <Ionicons name={'location-icon'} size={15} /> {article.location} &nbsp;
                        <Ionicons name={'material-icon'} size={15} /> {article.materials}  &nbsp;
                        <Ionicons name={'time-icon'} size={15} /> {article.createTime}
                    </Text>
                  </View>
              </Flex>
            </ImageBackground>
            <WhiteSpace />
            {/* 内容 */}
            <WingBlank size="sm">

              {
                article.content.map((item, key) => {
                  return(
                    <View style={styles.container} key={key}>
                        {item.title && <Text style={styles.containerTitle}>{item.title}</Text>}
                        {item.desciption && <Text style={styles.containerDesciption} selectable>{item.desciption}</Text>}
                        <WhiteSpace />
              
                        {item.imgUrl && <Image
                          style={{width: '100%', height: 200}}
                          source={{uri: item.imgUrl}}
                        />}
                        <WhiteSpace />
              
                        {item.body && <Text style={styles.containerDesciption}>{item.body}</Text>}
                    </View>
                  )

                })
              }
            </WingBlank>
            <WhiteSpace />


          </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
    header:{
      backgroundColor:'#f0f6fe',height:36
    },
    headerRow:{
      height:30,
      padding:20
    },
    headerText:{
      color:'#f2f2f2'
    },
    headerTitle:{
      fontSize:18,
      fontWeight: 'bold',
      color:'#f2f2f2'
    },
    container:{
      backgroundColor:'#ffffff',
      padding:10
    },
    containerTitle:{
      alignSelf:'center',
      height:40,
      padding:10,
      fontSize:16, 
      fontWeight:'bold'
    },
    containerDesciption:{
      color:'#a1a1a1'
    }
      
  })

