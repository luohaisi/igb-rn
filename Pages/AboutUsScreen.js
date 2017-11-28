import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from 'react-native';
import { Button, Toast } from 'antd-mobile';

import SettingItem from '../Components/Common/SettingItem';

export default class AboutUsScreen extends Component {

  static navigationOptions = {
    headerTitle: '关于我们',
    headerTitleStyle:{
      color : '#F2F2F2',
      // alignSelf:'center'
    },
    headerStyle:{
      backgroundColor:'rgb(19,125,188)'
    },
    headerTintColor:'#F2F2F2'  // 返回箭头的颜色
  };

  logout = () =>{
    
        Toast.loading('退出', 1, () => {
    
          // console.log('Load complete !!!');
        });
  }

  render() {

    const { navigate } = this.props.navigation;

    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
      
    };

    renderIconView = (type) => {
      if(type == 'string'){
        return <Text style={{color:'#999'}}>0.1.3</Text>
      }else{
        return <Image source={require('../Images/Icons/right.png')}  style={styles.icon} />
      }
      
    }
    return (
      <View style={styles.container}>
        <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
        <Image style={{width:120,height:120}} source={require('../Images/logo.png')} />
        </View>
        <FlatList
           style={{flex: 1}}
          data={[
            {key: '联系我们', icon:require('../Images/Icons/unlock.png'), type:'modal'},
            {key: '服务协议', icon:require('../Images/Icons/repeal.png'), type:'modal'},
            {key: '当前版本', icon:require('../Images/Icons/post.png'), type:'string'},
          ]}
          renderItem={({item}) => (
            // <SettingItem item={item.key} icon={item.icon}  path={item.path} onPress={(path) =>{navigate(path)}} />
            <TouchableOpacity style={styles.settingItem} onPress={(path) =>{navigate(path)}}>
                <View style={{width: '10%', height: 50, alignItems:'flex-start',justifyContent:'center'}}>

                </View>
                <View style={{width: '70%', height: 50, alignItems:'flex-start', justifyContent:'center'}}>
                  <Text style={styles.item}>{item.key}</Text>
                </View>
                <View style={{width: '20%', height: 50, alignItems:'center', justifyContent:'center'}} >
                  {renderIconView(item.type)}
                </View>
            </TouchableOpacity>
          )}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10,
   backgroundColor:'#FFF',
  },
  settingItem:{
    flex: 1, 
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:'#F2F2F2',
    alignSelf:'flex-end'
  },
  item: {
    padding: 10,
    margin:10,
    fontSize: 16,
    height: 50,
    color:'#999'
  },
  icon: {
    padding: 10,
    margin:10,
    width:25,
    height: 25,
  }
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => AboutUsScreen);