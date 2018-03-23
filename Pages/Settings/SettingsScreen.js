/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { 
  AppRegistry, 
  StyleSheet,
  FlatList, 
  Text, 
  Image, 
  View, 
  TouchableOpacity 
} from 'react-native';
import { Button, Toast } from 'antd-mobile';
// Services
var LoginService = require('../../Services/LoginService.js')

var ls = require('react-native-local-storage');

export default class SettingsScreen extends React.Component {

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

    Toast.loading('Loading...', 10);

    ls.get('userInfo').then((data) => {

      LoginService.logout(data.loginName, data.password, data.token).then(response=>{
        // console.info('logout', response)
        Toast.hide()
  
        if(response.return_code == '0' && response.return_message == "Success"){
  
            ls.clear().then(()=>{
              Toast.loading('退出成功', 1, ()=>{
                TheBrowser.setState({
                  remoteData:null,
                  showLoginModal:true
                })
                this.props.navigation.goBack()
                this.props.navigation.navigate('Home')
              });
            })
        }else{
          Toast.fail(response.return_message, 2);
        }
  
      });

    });
    
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
            style={{flex: 1}}
          data={[
            {key: '密码管理', icon:require('../../Images/Icons/unlock.png'), path:'Password'},
            {key: '清除缓存', icon:require('../../Images/Icons/repeal.png'), path:'ClearCache'},
            {key: '意见反馈', icon:require('../../Images/Icons/post.png'), path:'Feedback'},
            {key: '关于我们', icon:require('../../Images/Icons/info.png'), path:'AboutUs'}
          ]}
          renderItem={({item}) => (
            // <SettingItem item={item.key} icon={item.icon}  path={item.path} onPress={(path) =>{navigate(path)}} />
            <TouchableOpacity style={styles.settingItem} onPress={()=>this.props.navigation.navigate(item.path)}>
                <View style={{width: '25%', height: 50, alignItems:'flex-start',justifyContent:'center'}}>
                  <Image source={item.icon}  style={styles.icon} />
                </View>
                <View style={{width: '50%', height: 50, alignItems:'center', justifyContent:'center'}}>
                  <Text style={styles.item}>{item.key}</Text>
                </View>
                <View style={{width: '25%', height: 50, alignItems:'flex-end', justifyContent:'center'}}>
                  <Image source={require('../../Images/Icons/right.png')}  style={styles.icon} />
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