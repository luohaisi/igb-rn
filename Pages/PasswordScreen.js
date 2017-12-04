import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Toast, Modal } from 'antd-mobile';

const alert = Modal.alert;

// Services
var UserService = require('../Services/UserService.js')
var LoginService = require('../Services/LoginService.js')

var ls = require('react-native-local-storage');

export default class PasswordScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        passwordOld: '',
        passwordNew: '',
        passwordNewConfirm: '',
      };
  }

  static navigationOptions = {
    headerTitle: '设置密码',
    headerTitleStyle:{
      color : '#F2F2F2',
      // alignSelf:'center'
    },
    headerStyle:{
      backgroundColor:'rgb(19,125,188)'
    },
    headerTintColor:'#F2F2F2'  // 返回箭头的颜色
  };


  updatePwd = () => {

    // 验证两次密码输入是否一致
    if(this.state.passwordNew != this.state.passwordNewConfirm){
        Toast.fail('两次密码输入不一致!', 1)
        return false
    }

    Toast.loading('Loading...', 10);

    ls.get('userInfo').then((data) => {

        // 前端验证原密码是否输入正确
        if(data.password != this.state.passwordOld){
            Toast.fail('旧密码输入错误!',1)
            return false
        }
        
        object = {
            loginName:data.loginName,
            password:data.password,
            token:data.token,
            userId:data.userId,
            oldPwd:this.state.passwordOld,
            newPwd:this.state.passwordNew,
            requestType:'MOBILE_USER_UPDATE_PWD',
        }
    
        UserService.updatePwd(object).then((response) => {
            Toast.hide()
            
            if(response.return_code == '0' && response.return_message == "Success"){
                Toast.loading('密码修改成功', 2);
                // 登出
                LoginService.logout(data.loginName, data.password, data.token).then(response=>{
                
                    if(response.return_code == '0' && response.return_message == "Success"){
                
                        ls.clear().then(()=>{
                            this.props.navigation.navigate('Login')
                        })
                    }else{
                        Toast.fail(response.return_message, 2);
                    }
                
                });

            }else{
            Toast.fail(response.return_message, 2);
            }
        })

    });
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1,justifyContent:'space-between', alignItems: 'center'}}>
            <View style={{width: '80%'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(passwordOld) => this.setState({passwordOld})}
                    secureTextEntry={true}
                    placeholder={'旧密码'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(passwordNew) => this.setState({passwordNew})}
                    secureTextEntry={true}
                    placeholder={'新密码'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(passwordNewConfirm) => this.setState({passwordNewConfirm})}
                    secureTextEntry={true}
                    placeholder={'确认新密码'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <Button type="primary" 
                    size="small" 
                    inline 
                    onClick={this.updatePwd} 
                    style={styles.logoutButton} 
                  color="#f2f2f2">确定</Button>
            </View>
        </View>
        <View style={{flex: 1,justifyContent:'flex-start',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>alert(
                                                    '温馨提示',
                                                    '请联系我们的工作人员 021-12345678',
                                                    [{ text: '好的' }]
                                                )}>
                <Text>忘记密码?</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor:'rgb(238,238,238)',
    },
    textInput:{
      height: 50, 
      backgroundColor: '#FFF',
      paddingLeft: 20,
      fontSize:16
    },
    logoutButton:{
        height: 50, 
        backgroundColor: 'orange',
        borderColor:'#F2F2F2',
        marginBottom:20
      },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => PasswordScreen);