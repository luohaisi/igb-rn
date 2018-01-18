import React, { Component } from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Platform,
  BackHandler,
  WebView,
  Modal, 
  View,  
  Text, 
  Image, 
  TextInput, 
  TouchableHighlight, 
  TouchableOpacity,
  Alert
} from 'react-native';

import { Toast, Button, WhiteSpace } from 'antd-mobile';

// import LoginModal from './LoginModal';

var ls = require('react-native-local-storage');

var WEBVIEW_REF = 'webview';

let count = 0

// Services
var LoginService = require('../Services/LoginService.js')

var Conf = require('../Conf/Conf.js')

let HOST = Conf.WEB_HOME

export default class BrowserScreen extends Component {

  static navigationOptions = {
    header: null,
  }; 

  constructor(props) {
    super(props);
    this.state = {
      title: '阳光采购',
      modalVisible: false,
      showLoginModal: true,
      website: HOST + '/launch',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      isBrowserPage: true,
      loginName: '',
      password: ''
    };
  }

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

  componentWillMount() {

    TheBrowser = this

    this._addBackHandler()
    
  }

  _addBackHandler = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', function() {

        // 如果不是浏览器页面,不作为
        if(TheBrowser.state.isBrowserPage != true)
          return false

        if (TheBrowser.state.backButtonEnabled) {
          TheBrowser.goBack();
          return true;
        }
        // 第一次按后退提示再按退出
        count++
        if(count > 1 && TheBrowser.props.navigation.state.routeName == 'Browser')
          BackHandler.exitApp()
        Toast.info('再按一次返回键退出',1);

        // 3秒钟后设置count=0 重新计算
        setTimeout(()=>count = 0,3000)

        return true;
       });

    }
  }

  _removeBackHandler = () => {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', TheBrowser.onBackAndroid);
    }
  }

  // componentWillUnmount() {
  //   this._removeBackHandler()
  // }

  onBackAndroid = () => {
    console.log('onBackAndroid')
    return true;
  };

  isBrowserPage = () => {
    TheBrowser.setState({
      isBrowserPage: !TheBrowser.state.isBrowserPage
    });
  }

  onNavigationStateChange = (navState) => {
    console.log('onNavigationStateChange')

    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      // title: navState.title
    });
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  reload = () => {
    // this.refs[WEBVIEW_REF].reload();
  }

  _goSetting = () => {

    this.props.navigation.navigate('Setting')
  }

  _onMessage = (event)=>{
    let message = JSON.parse(event.nativeEvent.data)

    if(message.title){
      this.setState({title: message.title})
    }

    if(message.backBtnEnabled){
      this.setState({backButtonEnabled: message.backBtnEnabled})
    }else{
      this.setState({backButtonEnabled: false})
    }

    console.log('_onMessage', event.nativeEvent.data)
  }

  _goSearch = () => {
    Alert.alert('敬请期待！')
  }

  _goMail = () => {
    Alert.alert('敬请期待！')
  }

  renderError(errorDomain, errorCode, errorDesc) {
    return (
      <View style={styles.error}>
        <TouchableOpacity style={styles.button} onPress={this.reload}>
          <Text style={{color:'white'}}>重新加载</Text>
        </TouchableOpacity>
      </View>
    );
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
            this.setState({
              website:url
            })


            this.setState({
              showLoginModal: false
            })
            // this.props.navigation.navigate('Browser', { url: url })
            // y
          });
        })
      }else{
        Toast.fail(response.return_message, 2);
        Alert.alert(response.return_message)
      }
      

    });    
  }

  renderLoginModal(){

    return (
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

        </View>        

        <View style={{height: 100}} >
          
        </View>

      </View>
    );
  }

  render() {

    const { navigate } = this.props.navigation;

    const { state } = this.props.navigation;
    // const { url } = state.params;

    return (
      
      <View style={{flex:1}}>
          
        <View style={[styles.addressBarRow,Platform.OS === 'ios' ? styles.addressBarRowIOS : '']}>

          <View style={{flex: 1, flexDirection: 'row',alignItems:'center'}}>
            <View style={{flex: 1}}>

              <TouchableOpacity style={this.state.backButtonEnabled ? styles.disabledButton : ''}
                                onPress={this._goSetting} >
                <Image source={require('../Images/Icons/settings_light.png')} style={{width:30,height:30}} />
              </TouchableOpacity>
            
              <TouchableOpacity
                onPress={this.goBack}
                style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                <Image source={require('../Images/Icons/back.png')} style={{width:30,height:30}} />
              </TouchableOpacity>

            </View>
            <View style={{flex: 4, alignItems:'center', justifyContent:'center'}} >
              <TouchableOpacity onPress={this.reload}>
                <Text style={{color : '#F2F2F2'}}>{this.state.title}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,alignItems:'flex-end'}} >
              <TouchableOpacity style={this.state.backButtonEnabled ? styles.disabledButton : ''}
                                onPress={this._goSearch} >
                <Image source={require('../Images/Icons/search.png')} style={{width:30,height:30}} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,alignItems:'flex-end'}} >
              <TouchableOpacity style={this.state.backButtonEnabled ? styles.disabledButton : ''}
                                onPress={this._goMail} >
                <Image source={require('../Images/Icons/mail.png')} style={{width:30,height:30}} />
              </TouchableOpacity>
            </View>

          </View>

        </View>

          <WebView style={{flex:1}} source={{uri: this.state.website}}
                  ref={WEBVIEW_REF}
                  onLoad={() => {
                    // this.setState({modalVisible: true})
                  }}
                  onLoadEnd={()=>{
                    this.setState({modalVisible: false})
                  }}
                  onMessage={this._onMessage}
                  onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                  renderError={this.renderError}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.showLoginModal}
            onRequestClose={() => {}}
            >
              {this.renderLoginModal()}
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
            >
            <View style={{flex:1, backgroundColor: 'rgba(19,160,232,0.5)'}}>
              <View style={{flex:1,alignItems:'center',justifyContent:'space-around'}}>
                <Image style={{width:100,height:100}} source={require('../Images/loadingIcon.png')} />
              </View>
              <View style={{flex:1,alignItems:'center',justifyContent:'flex-end',marginBottom:20}}>
                <Image style={{width:32,height:32}} source={require('../Images/loading.png')} />
                <Text style={{color:'#F2F2F2'}}>正在初始化应用,请稍后...</Text>
              </View>
            </View>
          </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor:'#117BE9'
  },
  addressBarRowIOS: {
    paddingTop: 28
  },
  disabledButton: {
    display:'none'
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  error: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FF0000',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 3
  },
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
AppRegistry.registerComponent('IGreenBuy', () => BrowserScreen);