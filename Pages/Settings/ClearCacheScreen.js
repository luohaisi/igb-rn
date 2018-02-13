import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from 'react-native';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;

export default class ClearCacheScreen extends Component {

  static navigationOptions = {
    headerTitle: '清除缓存',
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
                {key: '总占用空间', icon:require('../Images/Icons/delete.png'), path:'Password'},
                {key: '缓存占用空间', icon:require('../Images/Icons/delete.png'), path:'ClearCache'},
            ]}
            renderItem={({item}) => (
                // <SettingItem item={item.key} icon={item.icon}  path={item.path} onPress={(path) =>{navigate(path)}} />
                <View style={styles.settingItem}>
                    <View style={{width: '20%', height: 50, alignItems:'flex-end',justifyContent:'center'}}>
                        <Image source={item.icon}  style={styles.icon} />
                    </View>
                    <View style={{width: '60%', height: 50, alignItems:'flex-start', justifyContent:'center'}}>
                        <Text style={styles.item}>{item.key}</Text>
                    </View>
                    <View style={{width: '20%', height: 50, alignItems:'center', justifyContent:'center'}}>
      
                        <TouchableOpacity onPress={()=>alert(
                                                    '温馨提示',
                                                    '确定清除133.8M缓存?',
                                                    [{ text: '清空' },{ text: '取消' }]
                                                )}>
                            <Text style={{color:'steelblue'}}>清空</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
//    paddingTop: 10,
   backgroundColor:'rgb(238,238,238)',
  },
  settingItem:{
    flex: 1, 
    flexDirection: 'row',
    backgroundColor:'#FFF',
    alignSelf:'flex-end',
    borderBottomWidth:1,
    borderBottomColor:'rgb(238,238,238)'
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
  },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => ClearCacheScreen);