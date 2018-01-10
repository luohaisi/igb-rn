import React, { Component } from 'react';
import { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Image,
  TouchableHighlight

} from 'react-native';

import { Button, InputItem, WhiteSpace, Toast } from 'antd-mobile';

var ls = require('react-native-local-storage');

// Services
var LoginService = require('../Services/LoginService.js')

var Conf = require('../Conf/Conf.js')

let HOST = Conf.WEB_HOME



export default class LoginModal extends Component {


  componentDidMount(){
    // 从接口请求默认数据
    ls.get('userInfo').then((data) => {
      if(data && data.entName){

        // this.props.navigation.navigate('Browser', { entName:  data.entName })
        
        this.setState({
          loginName: data.loginName
        });
      }
      
    });
  }


  constructor(props) {
    super(props);
    this.state = {
      loginName: '',
      password: ''
    };
  }

  /**
   * 提交
   */
  submit = (loginName, password) =>{

    Toast.loading('Loading...', 10);
    
    LoginService.login(loginName, password).then(response=>{

      Toast.hide()

      if(response.return_code == '0' && response.return_message == "Success"){
        let userInfo = response.result[0]
        if(userInfo){
          userInfo.password = password
        }
        ls.save('userInfo', userInfo).then(()=>{
          ls.get('userInfo').then((data) => {
            let url = HOST + '?loginName=' + loginName 
                           + '&password='+ password 
                           + '&token='+ data.token
                           + '&hideHeader=true'
            console.log('website', url)
            // this.props.navigation.navigate('Browser', { url: url })
            // y
          });
        })
      }else{
        Toast.fail(response.return_message, 2);
      }
      

    });    
  }


  render() {

    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'rgb(19,125,188)'
      }}>
        <View style={{marginTop:100}} >
          <Image style={{width:120,height:75}} source={require('../Images/logo.png')} />
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
{/* 
          <View style={{height: 50}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '50%', height: 50, alignItems:'center'}}>
                <Text style={{color:'#ccc'}}>注册</Text>
              </View>
              <View style={{width: '50%', height: 50, alignItems:'center'}}>
                <Text style={{color:'#ccc'}}>忘记密码?</Text>
              </View>
            </View>
          </View> 
*/}

        </View>        

        <View style={{height: 100}} >
{/*           
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '15%', height: 50, alignItems:'center'}}>
              <Image source={require('../Images/Icons/weibo.png')} style={{width:32,height:32}} />
            </View>
            <View style={{width: '15%', height: 50, alignItems:'center'}}>
              <Image source={require('../Images/Icons/wechat.png')} style={{width:32,height:32}} />
            </View>
            <View style={{width: '15%', height: 50, alignItems:'center'}}>
              <Image source={require('../Images/Icons/alipay.png')} style={{width:32,height:32}} />
            </View>
          </View>
*/}
          
        </View>

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

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => LoginModal);