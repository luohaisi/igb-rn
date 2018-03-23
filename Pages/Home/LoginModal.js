import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Image,
  Alert,
  TouchableHighlight
} from 'react-native';

import { Button, InputItem, WhiteSpace , ActivityIndicator} from 'antd-mobile';

// Services
var LoginService = require('../../Services/LoginService.js')

export default class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginName: '',
      password: '',
      showLoading:false
    };
  }

  /**
   * 提交
   */
  submit = (loginName, password) => {

    this.setState({ showLoading:true })
    
    LoginService.login(loginName, password).then(response=>{

      this.setState({ showLoading:false })

      if(response.return_code == '0' && response.return_message == "Success"){
        // console.log('loginData', response.result[0])
        let userInfo = response.result[0]
        if(userInfo){
          userInfo.password = password
        }

        this.props.onSumit(userInfo)
      }else{
        Alert.alert(response.return_message)
      }

    });    
  }


  render() {

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'rgb(19,125,188)'
      }}>
        <View style={{marginTop:100}} >
          <Image style={{width:120,height:75}} source={require('../../Images/logo.png')} />
        </View>
        <View style={{alignItems:'center',marginTop:30}} >
          <Text style={{color:'#F2F2F2',fontSize:20}}>绿智汇阳光采购云平台</Text>
          <WhiteSpace/>
          <Text style={{color:'#ccc',fontSize:16}}>Welcome To Our App</Text>
        </View>
        <View style={{width: '80%'}}>          

          <TextInput
            style={styles.textInput}
            onChangeText={(loginName) => this.setState({loginName})}
            placeholder={'手机/邮箱/账号'}
            value={this.state.loginName}
            underlineColorAndroid="rgb(45,155,212)"
          />

          <WhiteSpace/>

          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(password) => this.setState({password})}
            placeholder={'密码'}
            underlineColorAndroid="rgb(45,155,212)"
          />

          <WhiteSpace size='xl' />

          <Button type="primary" 
                  inline 
                  onClick={()=>this.submit(this.state.loginName, this.state.password)} 
                  style={styles.submitButton} 
                  color="#f2f2f2">登入
          </Button>

          <WhiteSpace/>

        </View>        

        <View style={{height: 100}} >
        </View>

        <ActivityIndicator animating={this.state.showLoading} toast text="登陆中" color="white" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput:{
    height: 50, 
    backgroundColor: 'rgb(45,155,212)',
    paddingLeft: 20,
    color:'#F2F2F2',
    fontSize:16
    // borderColor: 'gray', 
    // borderWidth: 1
  },
  submitButton:{
    height: 50, 
    backgroundColor: 'rgb(19,125,188)',
    borderColor:'rgb(131,194,148)',
    borderRadius:50,
  },
  signInHome:{
    width: 200, 
    height: 50, 
    backgroundColor:'#f2f2f2',
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});