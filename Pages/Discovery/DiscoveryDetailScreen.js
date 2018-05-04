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

import { URL_FOR_ADVANCED_MATERIAL, IMG_BASE_URL } from "../../Conf/Host.js";
// import {
//   newMaterialData
// } from './mock'

// const article = null

export default class DiscoveryDetailScreen extends React.Component {

  constructor(props){
    super(props)

    this.articleId = props.navigation.state.params.articleId

    this.state = {
      article:[]
    }
    // article = newMaterialData[this.articleId]
    this._getAdvancedMaterialDetail(this.articleId)
  }

  _getAdvancedMaterialDetail = (articleId) => {

    let params = {
      id:articleId
    }

    fetch(URL_FOR_ADVANCED_MATERIAL + '/detail', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('responseJson', responseJson)
      this.setState({
        article:responseJson
      })
      
    })
    .catch((error) => {
      console.error(error);
    });

    
  }

  static navigationOptions = {
    title: '新材料',
    headerStyle: {
      backgroundColor: '#117BE9',
    },
    headerTintColor: '#F2F2F2',
  };


  render(){

    const { article } = this.state

    if(article.title == undefined){
      return(
        <ActivityIndicator toast text="正在加载" />
      )
    }

      return(
          <ScrollView>
            {/* 头部 */}
            <ImageBackground style={{height:220,width:'100%', opacity:0.8}} source={{uri:article.cover?article.cover:'http://www.igreenbuy.com/themes/simple/public/images/usericon.jpg'}} >
              <Flex direction="column" align="start" style={{height:220, paddingTop:80}}>
                  <View style={styles.headerRow}>
                      <Text style={styles.headerTitle}>{article.title}</Text>
                  </View>
                  <View style={styles.headerRow}>
                      <Text style={styles.headerText}>
                      <Ionicons name={getIconName(article.type_name)} size={15} />  {article.type_name}
                      </Text>
                  </View>
                  <View style={styles.headerRow}>
                      <Text style={styles.headerText}>
                        <Ionicons name={'location-icon'} size={15} /> {article.location} &nbsp;
                        <Ionicons name={'material-icon'} size={15} /> {article.materials}  &nbsp;
                        <Ionicons name={'time-icon'} size={15} /> {article.create_time}
                    </Text>
                  </View>
              </Flex>
            </ImageBackground>
            <WhiteSpace />
            {/* 内容 */}
            <WingBlank size="sm">

              {
                 JSON.parse(article.content).map((item, key) => {
                  //  console.log('content:' + key, item)
                  return(
                    <View style={styles.container} key={key}>
                        {item.sub_title != undefined && item.sub_title != null && <Text style={styles.containerTitle}>{item.sub_title}</Text>}
                        {item.description != undefined && item.description != null && <Text style={styles.containerDesciption} selectable>&nbsp;&nbsp;&nbsp;&nbsp;{item.description}</Text>}
                        <WhiteSpace />
              
                        {
                          item.imgList && item.imgList.length > 0 && item.imgList.map((pic, key) => {
                            return(
                              <View key={key} style={{marginBottom:10}}>
                                <Image style={{width: '100%', height: 220, resizeMode: Image.resizeMode.stretch}} source={{uri: IMG_BASE_URL + pic}} />
                              </View>
                            )
                          })
                        }
                        <WhiteSpace />
              
                        {item.body != undefined && item.body != null && <Text style={styles.containerDesciption}>&nbsp;&nbsp;&nbsp;&nbsp;{item.body}</Text>}
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
      fontSize:22,
      fontWeight: 'bold',
      color:'#1aa6eb'
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
      color:'#a1a1a1',
      lineHeight:25,
      fontSize:15,
      
    }
      
  })

