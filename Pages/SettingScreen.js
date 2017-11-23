import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from 'react-native';
import { Button, Toast } from 'antd-mobile';

import SettingItem from '../Components/Common/SettingItem';

export default class SettingScreen extends Component {

  static navigationOptions = {
    headerTitle: '设置',
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
    return (
      <View style={styles.container}>
        <FlatList
           style={{flex: 1}}
          data={[
            {key: '密码管理', icon:require('../Images/Icons/unlock.png'), path:'Password'},
            {key: '清除缓存', icon:require('../Images/Icons/repeal.png'), path:'ClearCache'},
            {key: '意见反馈', icon:require('../Images/Icons/post.png'), path:'Feedback'},
            {key: '关于我们', icon:require('../Images/Icons/info.png'), path:'AboutUs'}
          ]}
          renderItem={({item}) => (
            // <SettingItem item={item.key} icon={item.icon}  path={item.path} onPress={(path) =>{navigate(path)}} />
            <TouchableOpacity style={styles.settingItem} onPress={()=>navigate(item.path)}>
                <View style={{width: '25%', height: 50, alignItems:'flex-start',justifyContent:'center'}}>
                  <Image source={item.icon}  style={styles.icon} />
                </View>
                <View style={{width: '50%', height: 50, alignItems:'center', justifyContent:'center'}}>
                  <Text style={styles.item}>{item.key}</Text>
                </View>
                <View style={{width: '25%', height: 50, alignItems:'flex-end', justifyContent:'center'}}>
                  <Image source={require('../Images/Icons/right.png')}  style={styles.icon} />
                </View>
            </TouchableOpacity>
          )}
        />
        <View style={{flex: 1,justifyContent:'flex-end',alignItems:'center'}}>
          <Button type="primary" 
                  size="small" 
                  inline 
                  onClick={this.logout} 
                  style={styles.logoutButton} 
                  color="#f2f2f2">退出登陆</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10,
   backgroundColor:'rgb(19,125,188)',
  },
  settingItem:{
    flex: 1, 
    flexDirection: 'row',
    borderBottomWidth:1,
    width:'98%', 
    borderBottomColor:'rgb(115,196,243)',
    alignSelf:'flex-end'
  },
  logoutButton:{
    height: 50, 
    backgroundColor: 'rgb(19,125,188)',
    borderColor:'#F2F2F2',
    marginBottom:20,
    width:'50%'
  },
  cell:{
   borderBottomWidth: 1,
   borderBottomColor: '#F2F2F2',
  },
  item: {
    padding: 10,
    margin:10,
    fontSize: 20,
    height: 50,
    color:'#F2F2F2'
  },
  icon: {
    padding: 10,
    margin:10,
    width:25,
    height: 25,
  },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => SettingScreen);